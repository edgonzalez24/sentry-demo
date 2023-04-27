<script lang="ts" setup>
import EmojiField from "@/components/EmojiField.vue";
import { ref, computed, onMounted, inject } from "vue";
import type Emoji from "@/types/Emoji";
// import type Entry from "@/types/Entry";
import { userInjectionKey } from "@/injectionKeys";
import UIcon from "@/components/UIcon.vue";

const text = ref("");
const emoji = ref<Emoji | null>(null);
const charCount = computed<number>(() => text.value.length);
const maxChars = 280;
const user = inject(userInjectionKey);

//Template refs
const textarea = ref<HTMLTextAreaElement | null>(null);

onMounted(() => textarea.value?.focus());
//Events
// const emit = defineEmits<{
//   (e: "@create", entry: Entry): void;
// }>();

const handleTextInput = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement;
  if (textarea.value.length <= maxChars) {
    text.value = textarea.value;
  } else {
    text.value = textarea.value = textarea.value.substring(0, 280);
  }
};

const handleSubmit = () => {
  throw new Error('Sentry Error');
  // emit("@create", {
  //   body: text.value,
  //   emoji: emoji.value,
  //   createdAt: new Date(),
  //   userId: 1,
  //   id: Math.random(),
  // });

  // text.value = "";
  // emoji.value = null;
};
</script>
<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea
      :value="text"
      ref="textarea"
      @keyup="handleTextInput"
      :placeholder="`New Journal Entry for ${user?.username || 'Anonymous'}`"
    ></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer items-center">
      <span>{{ charCount }} / {{ maxChars }}</span>
      <button class="items-center">Remember <UIcon icon="arrow-circle-right" /></button>
    </div>
  </form>
</template>
