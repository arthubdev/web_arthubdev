# Contexto AI - ArtHub Dev Web

Este documento resume el proyecto para que una IA o un desarrollador pueda retomarlo rapido en futuras sesiones.

## Resumen del proyecto

ArtHub Dev Web es la pagina web y CMS de ArtHub Dev, una marca/estudio enfocado en desarrollo web profesional. La parte publica funciona como landing page one-page con secciones de inicio, sobre nosotros, servicios, portafolio y contacto. Tambien incluye paginas legales y un panel administrativo para gestionar contenido dinamico.

La app esta construida con Nuxt 4, Vue 3, Tailwind CSS, Supabase y Cloudflare R2. El contenido publico combina datos dinamicos desde Supabase con textos fallback en componentes Vue.

## Stack principal

- Framework: Nuxt 4 con Vue 3 y Nitro server routes.
- Estilos: Tailwind CSS, CSS global en `app/assets/css/main.css`.
- UI/iconos: `lucide-vue-next`.
- Animaciones: `motion-v` y componentes locales `FadeUp` / `FadeRight`.
- Backend/datos: Supabase.
- Auth: Supabase Auth para el panel admin.
- Storage: Cloudflare R2 via AWS S3 SDK.
- Editor rich text: Tiptap.
- Validacion: Zod.
- Package manager: pnpm.

## Comandos utiles

```bash
pnpm install
pnpm dev
pnpm build
pnpm generate
pnpm preview
```

No hay scripts de lint/test configurados actualmente en `package.json`.

## Estructura general

- `app/app.vue`: wrapper raiz con `NuxtLayout` y `NuxtPage`.
- `app/pages/index.vue`: home publica; renderiza las secciones principales.
- `app/pages/privacidad.vue` y `app/pages/terminos.vue`: paginas legales.
- `app/layouts/default.vue`: layout publico con navbar, overlay y footer.
- `app/layouts/legal.vue`: layout simple para paginas legales.
- `app/layouts/admin.vue`: layout del CMS con sidebar y navegacion admin.
- `app/middleware/admin.ts`: protege rutas admin en cliente verificando `useSupabaseUser`.
- `app/components/sections/*`: secciones principales de la landing.
- `app/components/layout/*`: navbar, footer y piezas responsivas.
- `app/components/ui/*`: componentes base reutilizables (`AppButton`, `AppCard`, `AppBadge`, etc.).
- `app/components/admin/*`: componentes del CMS como `MediaPicker` y `TiptapEditor`.
- `app/constants/*`: constantes de navegacion, footer, contacto y contenido fallback.
- `server/api/*`: endpoints publicos y administrativos.
- `server/utils/supabase.ts`: cliente Supabase admin con service role.
- `server/utils/r2.ts`: cliente Cloudflare R2.
- `db.sql`: esquema de base de datos, triggers, RLS, policies e indices.
- `public/`: assets estaticos como logo, isotipo, favicon y robots.

## Pagina publica

La home (`app/pages/index.vue`) renderiza:

1. `HeroSection`
2. `AboutSection`
3. `ServicesSection`
4. `PortfolioSection`
5. `ContactSection`

Las secciones tienen estetica dark/premium con fondo `#050505`, acentos violeta/fucsia, blur/glows, bordes translucidos, tarjetas y tipografias Sora/Inter.

### Datos dinamicos en publico

- `HeroSection`: lee `/api/site/settings` para slogan y descripcion.
- `AboutSection`: lee `/api/about-sections`, ordena por `orden`, filtra `activo` y usa fallbacks si no hay datos.
- `ServicesSection`: lee `/api/services`, mapea el campo `icono` a componentes de Lucide.
- `PortfolioSection`: lee `/api/portfolio` y `/api/categories`, permite filtrar por categoria y abre modal de proyecto.
- `ContactSection`: lee `/api/site/settings` para WhatsApp, correo, ubicacion y redes; envia formulario a `/api/contact`.

## Panel administrativo

El panel esta bajo `/admin`.

Secciones del sidebar:

- Dashboard: `/admin`
- Servicios: `/admin/services`
- Portafolio: `/admin/portfolio`
- Categorias: `/admin/categories`
- Sobre Nosotros: `/admin/about`
- Mensajes: `/admin/contact-messages`
- Testimonios: `/admin/testimonials`
- SEO: `/admin/seo-pages`
- Media: `/admin/media`
- Configuracion: `/admin/settings`

El login esta en `/admin/login` y usa `supabase.auth.signInWithPassword`.

Importante: el middleware `admin.ts` protege las paginas admin en cliente, pero varias rutas `server/api/admin/*` usan la `SUPABASE_SERVICE_ROLE_KEY` sin comprobar la sesion del request en el servidor. Si el sitio se expone publicamente, conviene agregar validacion server-side de usuario/admin antes de permitir CRUD.

## Backend/API

### Publicas

- `GET /api/site/settings`: trae el primer registro de `site_settings`.
- `GET /api/services`: trae servicios activos ordenados.
- `GET /api/portfolio`: trae proyectos activos, destacados primero.
- `GET /api/categories`: trae categorias.
- `GET /api/about-sections`: trae secciones activas/ordenadas.
- `POST /api/contact`: valida con Zod e inserta en `contact_messages`.

### Admin

Existen endpoints CRUD para:

- `services`
- `portfolio`
- `categories`
- `about-sections`
- `testimonials`
- `seo-pages`
- `contact-messages`
- `media`
- `settings`
- `dashboard`

Patron frecuente: crear un cliente Supabase con `createClient(config.public.supabaseUrl, config.supabaseServiceRoleKey)` y operar directo sobre tablas.

## Base de datos

El archivo `db.sql` define:

- Extension `pgcrypto`.
- Funcion `set_updated_at()`.
- Funcion `is_admin_user()`.
- Trigger `handle_new_user()` para crear perfiles al registrar usuarios en Supabase Auth.
- RLS habilitado en todas las tablas.
- Policies publicas de lectura para contenido visible.
- Policies admin para CRUD segun `is_admin_user()`.

Tablas principales:

- `profiles`: usuarios admin.
- `site_settings`: informacion global de empresa, contacto, redes, logo/favicon.
- `services`: servicios mostrados en landing.
- `categories`: categorias para portafolio.
- `portfolio`: proyectos.
- `about_sections`: contenido de "Sobre nosotros".
- `contact_messages`: mensajes del formulario.
- `testimonials`: testimonios.
- `seo_pages`: metadata SEO por slug.
- `media`: archivos subidos a R2.

## Variables de entorno esperadas

No incluir valores secretos en documentacion ni commits. El proyecto espera variables como:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`
- `R2_PUBLIC_URL`

## Estilo visual y convenciones

- Tema oscuro principal: `#050505`.
- Acentos: `#7B2EFF`, `#A855F7`, `#C084FC`.
- Fuentes: Sora para headings, Inter para body.
- Componentes de UI reutilizables viven en `app/components/ui`.
- Iconos preferidos: Lucide.
- Las secciones usan `AppSection`, `AppContainer`, `AppBadge` y animaciones locales.
- El contenido CMS puede traer HTML desde Tiptap y se renderiza con `v-html` en algunos lugares.

## Notas importantes / deuda tecnica conocida

- Hay textos con mojibake en varios archivos; se ven caracteres rotos en palabras como "disenamos", "categorias" y algunos simbolos. Probablemente se guardaron o abrieron con codificacion incorrecta. Conviene normalizar a UTF-8 y revisar UI.
- `server/api/contact.post.ts` inserta `estado: 'pendiente'`, pero `db.sql` define el check de `contact_messages.estado` como `nuevo`, `leido`, `respondido`, `archivado`. Esto puede romper el envio del formulario. Lo mas directo es usar `nuevo` o actualizar el check de la DB.
- Las APIs admin deberian validar sesion/rol en servidor. La proteccion actual del middleware solo evita navegar desde el cliente, pero no protege por si sola los endpoints.
- `db.sql` tambien tiene comentarios con mojibake; no afecta ejecucion, pero confunde lectura.
- El README sigue siendo el starter de Nuxt; este archivo funciona como contexto real del proyecto.
- Algunas constantes (`app/constants/contact.ts`, `footer.ts`) tienen datos hardcodeados que pueden no coincidir con `site_settings`.
- `AppButton` renderiza un `<button>` y a veces contiene `NuxtLink` dentro; puede ser valido visualmente, pero para accesibilidad/semantica podria revisarse si se usa como link.

## Recomendaciones para futuras sesiones de IA

Antes de editar, revisar primero:

1. `nuxt.config.ts` para config/modulos/runtime.
2. `app/pages/index.vue` para entender la composicion publica.
3. `app/components/sections/*` si el cambio toca la landing.
4. `app/layouts/admin.vue` y `app/pages/admin/*` si el cambio toca CMS.
5. `server/api/*` y `db.sql` si el cambio toca datos.

Al hacer cambios:

- Mantener el estilo dark/violeta existente.
- Preferir componentes existentes antes de crear nuevos.
- Evitar tocar secretos `.env`.
- Si se modifica contenido dinamico, revisar que la tabla y el endpoint coincidan.
- Si se agregan campos a Supabase, actualizar `db.sql`, endpoints, pantallas admin y secciones publicas afectadas.
- Si se toca formulario de contacto, verificar Zod, DB check constraints y mensajes UI.
