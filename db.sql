begin;

-- =========================================================
-- EXTENSIONES
-- =========================================================
create extension if not exists pgcrypto;

-- =========================================================
-- FUNCIONES AUXILIARES
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.rol = 'admin'
  );
$$;

grant execute on function public.is_admin_user() to anon, authenticated;

-- Trigger para crear el perfil al registrar un usuario en Supabase Auth.
-- Si más adelante agregas más usuarios, ajusta este comportamiento.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    nombre,
    avatar_url,
    rol
  )
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'nombre',
      split_part(new.email, '@', 1)
    ),
    nullif(new.raw_user_meta_data->>'avatar_url', ''),
    coalesce(new.raw_user_meta_data->>'role', 'admin')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    nombre = excluded.nombre,
    avatar_url = excluded.avatar_url;

  return new;
end;
$$;

-- =========================================================
-- TABLAS
-- =========================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  nombre text not null,
  avatar_url text,
  rol text not null default 'admin' check (rol in ('admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  nombre_empresa text,
  slogan text,
  descripcion text,
  correo text,
  telefono text,
  whatsapp text,
  direccion text,
  ciudad text,
  estado text,
  pais text,
  facebook text,
  instagram text,
  linkedin text,
  github text,
  logo_url text,
  favicon_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text not null unique,
  descripcion text,
  contenido text,
  icono text,
  imagen_url text,
  orden integer not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  slug text not null unique,
  icono text,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text not null unique,
  cliente text,
  descripcion text,
  contenido text,
  categoria_id uuid references public.categories(id) on delete set null,
  imagen_url text,
  sitio_url text,
  github_url text,
  destacado boolean not null default false,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.about_sections (
  id uuid primary key default gen_random_uuid(),
  titulo text,
  contenido text,
  orden integer not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  correo text not null,
  empresa text,
  telefono text,
  mensaje text not null,
  estado text not null default 'nuevo'
    check (estado in ('nuevo', 'leido', 'respondido', 'archivado')),
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  empresa text,
  cargo text,
  comentario text not null,
  foto_url text,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.seo_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  keywords text,
  og_image text,
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  url text not null,
  tipo text,
  tamano bigint,
  created_at timestamptz not null default now()
);

-- =========================================================
-- TRIGGERS updated_at
-- =========================================================

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

drop trigger if exists trg_services_updated_at on public.services;
create trigger trg_services_updated_at
before update on public.services
for each row
execute function public.set_updated_at();

drop trigger if exists trg_portfolio_updated_at on public.portfolio;
create trigger trg_portfolio_updated_at
before update on public.portfolio
for each row
execute function public.set_updated_at();

drop trigger if exists trg_about_sections_updated_at on public.about_sections;
create trigger trg_about_sections_updated_at
before update on public.about_sections
for each row
execute function public.set_updated_at();

drop trigger if exists trg_seo_pages_updated_at on public.seo_pages;
create trigger trg_seo_pages_updated_at
before update on public.seo_pages
for each row
execute function public.set_updated_at();

-- =========================================================
-- TRIGGER auth.users -> profiles
-- =========================================================

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- =========================================================
-- RLS
-- =========================================================

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.categories enable row level security;
alter table public.portfolio enable row level security;
alter table public.about_sections enable row level security;
alter table public.contact_messages enable row level security;
alter table public.testimonials enable row level security;
alter table public.seo_pages enable row level security;
alter table public.media enable row level security;

-- =========================================================
-- POLICIES: PROFILES
-- =========================================================

drop policy if exists "Profiles can be read by owner or admin" on public.profiles;
create policy "Profiles can be read by owner or admin"
on public.profiles
for select
using (
  auth.uid() = id
  or public.is_admin_user()
);

drop policy if exists "Profiles can be updated by owner or admin" on public.profiles;
create policy "Profiles can be updated by owner or admin"
on public.profiles
for update
using (
  auth.uid() = id
  or public.is_admin_user()
)
with check (
  auth.uid() = id
  or public.is_admin_user()
);

drop policy if exists "Profiles can be inserted by admin" on public.profiles;
create policy "Profiles can be inserted by admin"
on public.profiles
for insert
with check (
  public.is_admin_user()
);

drop policy if exists "Profiles can be deleted by admin" on public.profiles;
create policy "Profiles can be deleted by admin"
on public.profiles
for delete
using (
  public.is_admin_user()
);

-- =========================================================
-- POLICIES: SITE SETTINGS
-- =========================================================

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
using (true);

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- =========================================================
-- POLICIES: SERVICES
-- =========================================================

drop policy if exists "Public can read services" on public.services;
create policy "Public can read services"
on public.services
for select
using (true);

drop policy if exists "Admins can manage services" on public.services;
create policy "Admins can manage services"
on public.services
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- =========================================================
-- POLICIES: CATEGORIES
-- =========================================================

drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories"
on public.categories
for select
using (true);

drop policy if exists "Admins can manage categories" on public.categories;
create policy "Admins can manage categories"
on public.categories
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- =========================================================
-- POLICIES: PORTFOLIO
-- =========================================================

drop policy if exists "Public can read portfolio" on public.portfolio;
create policy "Public can read portfolio"
on public.portfolio
for select
using (true);

drop policy if exists "Admins can manage portfolio" on public.portfolio;
create policy "Admins can manage portfolio"
on public.portfolio
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- =========================================================
-- POLICIES: ABOUT SECTIONS
-- =========================================================

drop policy if exists "Public can read about sections" on public.about_sections;
create policy "Public can read about sections"
on public.about_sections
for select
using (true);

drop policy if exists "Admins can manage about sections" on public.about_sections;
create policy "Admins can manage about sections"
on public.about_sections
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- =========================================================
-- POLICIES: CONTACT MESSAGES
-- =========================================================

drop policy if exists "Anyone can insert contact messages" on public.contact_messages;
create policy "Anyone can insert contact messages"
on public.contact_messages
for insert
with check (true);

drop policy if exists "Admins can read contact messages" on public.contact_messages;
create policy "Admins can read contact messages"
on public.contact_messages
for select
using (public.is_admin_user());

drop policy if exists "Admins can update contact messages" on public.contact_messages;
create policy "Admins can update contact messages"
on public.contact_messages
for update
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "Admins can delete contact messages" on public.contact_messages;
create policy "Admins can delete contact messages"
on public.contact_messages
for delete
using (public.is_admin_user());

-- =========================================================
-- POLICIES: TESTIMONIALS
-- =========================================================

drop policy if exists "Public can read testimonials" on public.testimonials;
create policy "Public can read testimonials"
on public.testimonials
for select
using (true);

drop policy if exists "Admins can manage testimonials" on public.testimonials;
create policy "Admins can manage testimonials"
on public.testimonials
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- =========================================================
-- POLICIES: SEO PAGES
-- =========================================================

drop policy if exists "Public can read seo pages" on public.seo_pages;
create policy "Public can read seo pages"
on public.seo_pages
for select
using (true);

drop policy if exists "Admins can manage seo pages" on public.seo_pages;
create policy "Admins can manage seo pages"
on public.seo_pages
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- =========================================================
-- POLICIES: MEDIA
-- =========================================================

drop policy if exists "Public can read media" on public.media;
create policy "Public can read media"
on public.media
for select
using (true);

drop policy if exists "Admins can manage media" on public.media;
create policy "Admins can manage media"
on public.media
for all
using (public.is_admin_user())
with check (public.is_admin_user());

-- =========================================================
-- ÍNDICES ÚTILES
-- =========================================================

create index if not exists idx_services_activo on public.services (activo);
create index if not exists idx_services_orden on public.services (orden);

create index if not exists idx_categories_orden on public.categories (orden);

create index if not exists idx_portfolio_categoria_id on public.portfolio (categoria_id);
create index if not exists idx_portfolio_activo on public.portfolio (activo);
create index if not exists idx_portfolio_destacado on public.portfolio (destacado);

create index if not exists idx_about_sections_orden on public.about_sections (orden);
create index if not exists idx_about_sections_activo on public.about_sections (activo);

create index if not exists idx_testimonials_activo on public.testimonials (activo);

commit;