<template>
  <div id="app">
    <div class="app__header">
      <h1>Vue 3 Radial Progress Bar</h1>
      <p>Customizable radial progress bar component with gradients and animations!</p>
    </div>

    <div class="app__content">
      <div class="content__radial">
        <gradientProgress
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
        </gradientProgress>
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
          <div>
            <span>Start color</span>
            <input v-model="startColor" type="color" placeholder="Start color" />
          </div>
          <div>
            <span>Stop color</span>
            <input v-model="stopColor" type="color" placeholder="Stop color" />
          </div>
          <div>
            <span>Inner stroke color</span>
            <input v-model="innerStrokeColor" type="color" placeholder="Inner stroke color" />
          </div>
          <div>
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
// @ts-ignore
import gradientProgress from "../../dist/RadialProgressBar.esm";
import Input from "../../dev/components/Input.vue";
import { StrokeLinecap } from "../../dist/types/src/types";

export default defineComponent({
  name: "App",
  components: {
    gradientProgress,
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap");

body,
html,
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

h1,
p,
small,
span {
  margin: 0;
}

:root {
  --shadow: black;
  --primary: #141625;
  --secondary: #141625;
  --green-1: #00c58e;
  --green-2: #00e0a1;
  --shadow: 20px 20px 60px rgba(0, 0, 0, 0.192);
}
</style>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  background: #141625;
  padding: 1rem 20rem 5rem 20rem;
}

.app__header {
  background: #1f213a;
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.2rem 1.4rem;
  border-radius: 7px;
  color: white;
  box-shadow: var(--shadow);
}

.app__header p {
  margin-top: 1rem;
}

.app__content {
  padding: 1.5rem 2rem;
  border-radius: 7px;
  background: #1f213a;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow);
}

.content__radial {
  color: white;
}

.content__radial div:first-child {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.content__radial div small {
  font-size: 1.3rem;
  margin-right: 5px;
}

.content__radial div span {
  font-size: 2rem;
}
.content__controls {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
}
.content__controls button {
  outline: none;
  border: none;
  padding: 0.4rem 2rem;
  font-size: 1.3rem;
  background: var(--green-2);
  border-radius: 2px;
  color: white;
  cursor: pointer;
  transition: transform ease-in 0.14s;
}

.content__controls button:hover:not(:disabled) {
  transform: scale(1.09);
}
.content__controls button:disabled {
  background: rgb(131, 131, 131);
}

.content__options {
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.options__item {
  display: flex;
  margin: 1rem 0;
}

.options__item span {
  margin-bottom: 1rem;
}

.options__item div {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
