<template>
  <div class="input">
    <span v-if="title" class="text-settings">{{ title }}</span>
    <div class="input-content">
      <input type="text" :value="modelValue" />

      <div class="input__actions">
        <button size="18" icon="mdi mdi-menu-up" @click="handle++">
          <img src="./assets/chevron.svg" alt="Increment icon" />
        </button>

        <button size="18" icon="mdi mdi-menu-down" @click="handle--">
          <img src="./assets/chevron.svg" alt="Decrement icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

export default defineComponent({
  emits: ["update:modelValue"],

  props: {
    modelValue: {
      type: Number as PropType<number>,
      default: 0,
    },
    title: String as PropType<string>,
  },

  setup(props, context) {
    const handle = computed({
      get: () => props.modelValue,
      set: (modelValue) => context.emit("update:modelValue", modelValue),
    });

    return {
      handle,
    };
  },
});
</script>
