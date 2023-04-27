<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps<{
    icon: string;
  }>();
  const modules = import.meta.glob('@/assets/icons/**/*.svg', {
    as: 'raw',
    eager: true,
  });
  const svg = computed(() => {
    return modules['/src/assets/icons/' + props.icon + '.svg']
  });

</script>

<template>
  <i v-html="svg" class="mr-5" />
</template>