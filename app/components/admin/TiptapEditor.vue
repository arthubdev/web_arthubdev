<script setup lang="ts">
import { watch } from 'vue'

import { EditorContent, useEditor }
from '@tiptap/vue-3'

import StarterKit
from '@tiptap/starter-kit'

const modelValue =
  defineModel<string>({
    default: ''
  })

const editor = useEditor({
  extensions: [
    StarterKit
  ],

  content:
    modelValue.value,

  onUpdate: ({ editor }) => {
    modelValue.value =
      editor.getHTML()
  }
})

watch(
  modelValue,
  (value) => {
    if (
      editor.value &&
      value !==
      editor.value.getHTML()
    ) {
      editor.value.commands
        .setContent(
          value || ''
        )
    }
  }
)
</script>

<template>
  <div>
    <div
      v-if="editor"
      class="
        mb-4

        flex
        flex-wrap
        gap-2
      "
    >
      <button
        class="admin-editor-btn"
        @click="
          editor.chain()
          .focus()
          .toggleBold()
          .run()
        "
      >
        B
      </button>

      <button
        class="admin-editor-btn"
        @click="
          editor.chain()
          .focus()
          .toggleItalic()
          .run()
        "
      >
        I
      </button>

      <button
        class="admin-editor-btn"
        @click="
          editor.chain()
          .focus()
          .toggleHeading({
            level: 2
          })
          .run()
        "
      >
        H2
      </button>

      <button
        class="admin-editor-btn"
        @click="
          editor.chain()
          .focus()
          .toggleBulletList()
          .run()
        "
      >
        Lista
      </button>
    </div>

    <div
      class="
        rounded-xl

        border
        border-white/10

        bg-[#111111]

        p-4
      "
    >
      <EditorContent
        :editor="editor"
      />
    </div>
  </div>
</template>