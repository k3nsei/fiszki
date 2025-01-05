<script setup lang="ts">
import { defineProps } from 'vue';
import { type Fiszka } from '../models';
import { toBase64 } from '../utils';

const { item } = defineProps<{ item: Fiszka }>();

const textColor = (background: string): string => {
  const r = parseInt(background.slice(1, 3), 16);
  const g = parseInt(background.slice(3, 5), 16);
  const b = parseInt(background.slice(5, 7), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? 'black' : 'white';
};

const downloadSvgAsPng = () => {
  const element = document.querySelector('svg');

  if (!element) {
    return;
  }

  const data = toBase64(new XMLSerializer().serializeToString(element));
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  Object.assign(new Image(), {
    src: 'data:image/svg+xml;charset=utf-8;base64,' + data,
    onload: function (this: HTMLImageElement) {
      canvas.width = this.width;
      canvas.height = this.height;

      ctx?.drawImage(this, 0, 0);

      Object.assign(document.createElement('a'), {
        href: canvas.toDataURL('image/png'),
        download: 'fiszka.png',
      }).click();
    },
  });
};
</script>

<template>
  <div class="preview">
    <svg
      width="900"
      height="300"
      viewBox="0 0 600 200"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0"
        y="0"
        width="200"
        height="200"
        :fill="item.backgrounds[0]"
        stroke-width="1"
        stroke="black" />

      <image
        v-if="item.image"
        :href="item.image"
        x="10"
        y="10"
        width="180"
        height="180"
        preserveAspectRatio="xMidYMid meet" />

      <rect
        x="200"
        y="0"
        width="200"
        height="200"
        :fill="item.backgrounds[1]"
        stroke-width="1"
        stroke="black" />

      <text
        x="300"
        y="100"
        width="98"
        font-size="18"
        :fill="textColor(item.backgrounds[1])"
        text-anchor="middle"
        dominant-baseline="middle">
        {{ item.word }}
      </text>

      <rect
        x="400"
        y="0"
        width="200"
        height="200"
        :fill="item.backgrounds[2]"
        stroke-width="1"
        stroke="black" />

      <text
        x="500"
        y="100"
        font-size="18"
        :fill="textColor(item.backgrounds[2])"
        text-anchor="middle"
        dominant-baseline="middle">
        {{ item.translation }}
      </text>
    </svg>

    <button
      class="download"
      @click="downloadSvgAsPng">
      Zapisz obrazek
    </button>
  </div>
</template>

<style scoped>
.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.download {
  min-inline-size: 10rem;
  inline-size: auto;
  block-size: 2rem;
  display: inline-block;
  background-color: var(--primary-color);
  border: 0;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--base-text-color);

  &:hover {
    background-color: color-mix(in hsl, var(--primary-color), #19e123 5%);
  }

  &:active {
    background-color: color-mix(in hsl, var(--primary-color), #19e123 15%);
    box-shadow: 0 0 0.125rem color-mix(in hsl, var(--primary-color), black 25%);
  }

  cursor: pointer;
}
</style>
