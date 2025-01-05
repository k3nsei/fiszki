<script setup lang="ts">
import { ref } from 'vue';
import Editor from './components/Editor.vue';
import Preview from './components/Preview.vue';
import { type Fiszka } from './models';

const item = ref<Fiszka>({
  word: '',
  translation: '',
  backgrounds: ['#7ecff4', '#f8c598', '#ffe893'],
  image: null,
});

const onItemChange = (data: Fiszka) => {
  item.value = { ...data };
};
</script>

<template>
  <div class="fiszka">
    <Editor
      :item="item"
      @update:item="onItemChange" />
    <Preview :item="item" />
  </div>
</template>

<style scoped>
.fiszka {
  inline-size: 100%;
  display: grid;
  grid-template-rows: fit-content(2rem) 1fr;
  gap: 2rem;
}
</style>
