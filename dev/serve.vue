<template>
  <div id="app">
    <div class="app__content">
      <div class="content__radial">
        <radial-progress-bar v-bind="{ ...state }">
          <div>
            <small>Completed steps: </small>
            <span>{{ state.completedSteps }} / {{ state.totalSteps }}</span>
          </div>
        </radial-progress-bar>
        <div class="content__controls">
          <button :disabled="state.completedSteps <= 0" @click.prevent="state.completedSteps--">Prev</button>
          <button :disabled="state.completedSteps >= state.totalSteps" @click.prevent="state.completedSteps++">Next</button>
        </div>
      </div>

      <div class="content__options">
        <div class="options__item">
          <Input title="Total steps:" v-model="state.totalSteps" />
          <Input title="Animate speed:" v-model="state.animateSpeed" />
          <Input title="Diameter:" v-model="state.diameter" />
        </div>

        <div class="options__item">
          <Input title="Stoke width:" v-model="state.strokeWidth" />
          <Input title="Inner Stoke width:" v-model="state.innerStrokeWidth" />
        </div>

        <div class="options__item">
          <div>
            <span>Start color</span>
            <input v-model="state.startColor" type="color" placeholder="Start color" />
          </div>
          <div>
            <span>Stop color</span>
            <input v-model="state.stopColor" type="color" placeholder="Stop color" />
          </div>
          <div>
            <span>Inner stroke color</span>
            <input v-model="state.innerStrokeColor" type="color" placeholder="Inner stroke color" />
          </div>
          <div>
            <span>Clockwise</span>
            <input type="checkbox" :checked="state.isClockwise" @input="isClockwiseChanged" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import RadialProgressBar from "@/RadialProgress.vue";
import { StrokeLinecap } from "@/types";
import Input from "../demo/src/Input.vue";

export default defineComponent({
  name: "ServeDev",

  components: {
    RadialProgressBar,
    Input,
  },

  setup() {
    const state = reactive({
      completedSteps: 1,
      totalSteps: 6,
      animateSpeed: 1000,
      diameter: 300,
      strokeWidth: 10,
      innerStrokeWidth: 10,
      strokeLinecap: "round" as StrokeLinecap,
      startColor: "#00C58E",
      stopColor: "#00E0A1",
      innerStrokeColor: "#2F495E",
      timingFunc: "linear",
      isClockwise: true,
    });

    function isClockwiseChanged(e: any) {
      state.isClockwise = e.target.checked;
    }

    return {
      state,
      isClockwiseChanged,
    };
  },
});
</script>

<style scoped>
#app {
  height: 100vh;
}
</style>
