<template>
  <div id="app">
    <div class="app__header">
      <h1>
        <a href="https://github.com/jairoblatt/vue3-radial-progress" target="_blank">Vue 3 Radial Progress Bar</a>
      </h1>
      <p>Customizable radial progress bar component with gradients and animations!</p>
    </div>

    <div class="app__content">
      <div class="content__radial">
        <GradientProgress
          :diameter="diameter"
          :total-steps="totalSteps"
          :completed-steps="completedSteps"
          :animate-speed="animateSpeed"
          :stroke-width="strokeWidth"
          :inner-stroke-width="innerStrokeWidth"
          :stroke-linecap="strokeLinecap"
          :start-color="startColor"
          :stop-color="stopColor"
          :inner-stroke-color="innerStrokeColor"
          :timing-func="timingFunc"
          :is-clockwise="isClockwise"
        >
          <div>
            <small>Completed steps: </small>
            <span>{{ completedSteps }} / {{ totalSteps }}</span>
          </div>
        </GradientProgress>
        <div class="content__controls">
          <button :disabled="completedSteps <= 0" @click.prevent="completedSteps--">Prev</button>
          <button :disabled="completedSteps >= totalSteps" @click.prevent="completedSteps++">Next</button>
        </div>
      </div>

      <div class="content__options">
        <div class="options__item">
          <Input title="Total steps:" v-model="totalSteps" />
          <Input title="Animate speed:" v-model="animateSpeed" />
          <Input title="Diameter:" v-model="diameter" />
        </div>

        <div class="options__item">
          <Input title="Stoke width:" v-model="strokeWidth" />
          <Input title="Inner Stoke width:" v-model="innerStrokeWidth" />
        </div>

        <div class="options__item">
          <div class="item__color">
            <span>Start color</span>
            <input v-model="startColor" type="color" placeholder="Start color" />
          </div>
          <div class="item__color">
            <span>Stop color</span>
            <input v-model="stopColor" type="color" placeholder="Stop color" />
          </div>
          <div class="item__color">
            <span>Inner stroke color</span>
            <input v-model="innerStrokeColor" type="color" placeholder="Inner stroke color" />
          </div>
          <div class="item__color">
            <span>Clockwise</span>
            <input type="checkbox" :checked="isClockwise" @input="isClockwiseChanged" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GradientProgress, { StrokeLinecap } from "vue3-radial-progress";
import Input from "./Input.vue";

export default defineComponent({
  name: "App",
  components: {
    GradientProgress,
    Input,
  },

  data() {
    return {
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
    };
  },
  methods: {
    isClockwiseChanged(e: any) {
      this.isClockwise = e.target.checked;
    },
  },
});
</script>
