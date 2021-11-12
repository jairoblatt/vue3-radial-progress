<template>
  <div class="input">
    <span v-if="title" class="text-settings">{{ title }}</span>
    <div class="input-content">
      <input type="text" :value="modelValue" />

      <div class="input__actions">
        <button size="18" icon="mdi mdi-menu-up" @click="handle++">
          <img src="../assets/chevron.svg" alt="Increment icon" />
        </button>

        <button size="18" icon="mdi mdi-menu-down" @click="handle--">
          <img src="../assets/chevron.svg" alt="Decrement icon" />
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

<style scoped>
.input {
  display: flex;
  flex-direction: column;
}
.input-content {
  display: flex;
  align-items: center;
  position: relative;
}
.input span {
  margin-bottom: 0.5rem;
}

.input-content input {
  outline: none;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 1rem;
  padding-left: 1rem;
  height: 40px;
  width: 100px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.103);
  color: white;
}

.input__actions {
  display: flex;
  flex-direction: column;
}

.input__actions button {
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: ease-in 0.05s;
}
.input__actions button:hover {
  background: rgba(255, 255, 255, 0.048);
}

.input__actions button img {
  filter: invert(1);
}

.input__actions button:first-child img {
  transform: rotate(90deg);
}

.input__actions button:last-child img {
  transform: rotate(270deg);
}
</style>
