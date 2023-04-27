<script setup lang="ts">
  import UIcon from "@/components/UIcon.vue";
  const throwError = () => {
  throw new Error('Sentry Error');
}
</script>
<template>
  <h1 class="text-6xl flex items-center">
    <UIcon icon="file-notes" width="80" :classes="['mr-5','w-20']" />
    <strong> My Journal</strong>
  </h1>
  <button @click="throwError">Click</button>
</template>
