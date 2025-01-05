<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { type Fiszka } from '../models';

const { item } = defineProps<{ item: Fiszka }>();
const emit = defineEmits(['update:item']);

const handleImageUpload = (event: Event) => {
  const element = event.target as HTMLInputElement;
  const file = element.files?.[0] ?? null;

  if (file != null) {
    Object.assign(new FileReader(), {
      onload: function (this: FileReader, e: ProgressEvent<FileReader>): void {
        item.image = e.target?.result as string;
        emit('update:item', item);
      },
    }).readAsDataURL(file);
  }
};

const updateItem = () => {
  emit('update:item', item);
};
</script>

<template>
  <form class="editor">
    <div class="form-field">
      <label
        class="label"
        for="word">
        Słowo:
      </label>
      <input
        id="word"
        class="control"
        name="word"
        type="text"
        required
        v-model="item.word"
        @input="updateItem" />
    </div>

    <div class="form-field">
      <label
        class="label"
        for="translation">
        Tłumaczenie:
      </label>
      <input
        id="translation"
        class="control"
        name="translation"
        type="text"
        required
        v-model="item.translation"
        @input="updateItem" />
    </div>

    <div class="form-field">
      <label class="label">Kolor tła:</label>
      <input
        id="background"
        class="control"
        name="background"
        type="color"
        required
        v-model="item.backgrounds[0]"
        @input="updateItem" />
      <input
        id="background"
        class="control"
        name="background"
        type="color"
        required
        v-model="item.backgrounds[1]"
        @input="updateItem" />
      <input
        id="background"
        class="control"
        name="background"
        type="color"
        required
        v-model="item.backgrounds[2]"
        @input="updateItem" />
    </div>

    <div class="form-field">
      <label
        class="label"
        for="image">
        Obrazek:
      </label>
      <input
        id="image"
        class="control"
        name="image"
        type="file"
        accept="image/*"
        @change="handleImageUpload" />
    </div>
  </form>
</template>

<style scoped>
.editor {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25rem;

  .label {
    font-weight: bold;
    color: var(--primary-color);
    cursor: pointer;
  }

  .control {
    min-inline-size: 6rem;
    inline-size: 100%;
    block-size: 2rem;
    padding-inline: 0.5rem;
    padding-block: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
    color: var(--base-text-color);

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0.25rem rgb(from var(--primary-color) r g b / 50%);
    }

    &:is([type='color']) {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      min-inline-size: unset;
      inline-size: 2rem;
      margin-inline: auto;
      padding: 0;
      background-color: transparent;
      cursor: pointer;

      &::-webkit-color-swatch {
        border-radius: 0.25rem;
        border: none;
      }

      &::-moz-color-swatch {
        border-radius: 0.25rem;
        border: none;
      }
    }
  }

  &:has(> .control:where(:disabled)) {
    opacity: 0.75;

    * {
      cursor: default !important;
    }
  }

  &:has(> .control:where([type='color'])) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .label {
      grid-column: 1 / -1;
      text-align: start;
    }
  }
}
</style>
