<template>
  <div class="input">
    <span v-if="title" class="text-settings">{{ title }}</span>
    <div class="input-content">
      <input type="text" :value="value" @input="onInput($event.target.value)" />
      <div class="input-actions">
        <button data-testid="btn-increment" size="18" icon="mdi mdi-menu-up" @click="operation('increment')" />
        <button data-testid="btn-decrement" size="18" icon="mdi mdi-menu-down" @click="operation('decrement')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["updateModel"],

  props: {
    value: {
      type: Number as PropType<number>,
      default: 0,
    },
    title: String as PropType<string>,
  },

  methods: {
    operation(operation: string) {
      let value = this.value;
      let model = operation === "increment" ? ++value : --value;
      if (model >= 1) this.onInput(model);
    },

    onInput(value: unknown) {
      this.$emit("updateModel", Number(value) || this.value);
    },
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
}
.input span {
  margin: 0;
  margin-bottom: 2rem;
  padding: 0;
  display: inline-flex;
}
.input input {
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 0;
  padding-left: 2rem;
  width: 55px;
  height: 38px;
  background: #ffffff;
}
.input input[type="text"] {
  font-weight: 300;
  color: gray;
}
.input-actions {
  display: flex;
  flex-direction: column;
}
.input-actions .btn >>> i:hover {
  color: rgb(100, 100, 100);
}
</style>
