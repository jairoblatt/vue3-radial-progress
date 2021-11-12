<template>
  <div id="app">
    <div class="app__header">
      <h1>Vue 3 Radial Progress Bar</h1>
      <p>Customizable radial progress bar component with gradients and animations!</p>
    </div>

    <div class="app__content">
      <div class="content__radial">
        <radial-progress-bar
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
            <small>Total steps:</small>
            <span>{{ totalSteps }}</span>
          </div>

          <div>
            <small>Completed steps: </small>
            <span>{{ completedSteps }}</span>
          </div>
        </radial-progress-bar>
        <div class="content__controls">
          <button :disabled="completedSteps <= 0" @click.prevent="prevStep">Prev</button>
          <button :disabled="completedSteps >= totalSteps" @click.prevent="nextStep">Next</button>
        </div>
      </div>

      <div class="content__options">
        <div class="options__item">
          <span>Total steps</span>
          <!-- <Input /> -->
          <input type="number" placeholder="Total steps" :value="totalSteps" @input="totalStepsChanged" />
        </div>

        <div class="options__item">
          <span>Animate speed</span>
          <input type="number" placeholder="Animate speed" :value="animateSpeed" @input="animateSpeedChanged" />
        </div>

        <div class="options__item">
          <span>Diameter</span>
          <input type="number" placeholder="Diameter" :value="diameter" @input="diameterChanged" />
        </div>

        <div class="options__item">
          <span>Stoke width</span>
          <input type="number" placeholder="Stroke width" :value="strokeWidth" @input="strokeWidthChanged" />
        </div>

        <div class="options__item">
          <span>Inner Stoke width</span>
          <input type="number" placeholder="Inner Stroke width" :value="innerStrokeWidth" @input="innerStrokeWidthChanged" />
        </div>

        <div class="options__item">
          <span>Timing function</span>
          <input type="text" placeholder="Timing function" :value="timingFunc" @input="timingFuncChanged" />
        </div>

        <div class="options__item">
          <span>Start color</span>
          <input type="color" placeholder="Start color" :value="startColor" @input="startColorChanged" />
        </div>
        <div class="options__item">
          <span>Stop color</span>
          <input type="color" placeholder="Stop color" :value="stopColor" @input="stopColorChanged" />
        </div>
        <div class="options__item">
          <span>Inner stroke color</span>
          <input type="color" placeholder="Inner stroke color" :value="innerStrokeColor" @input="innerStrokeColorChanged" />
        </div>
        <div class="options__item">
          <span>Clockwise</span>
          <input type="checkbox" :checked="isClockwise" @input="isClockwiseChanged" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RadialProgressBar from "@/RadialProgressBar.vue";
import Input from "./components/Input.vue";

export default defineComponent({
  name: "ServeDev",
  components: {
    RadialProgressBar,
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
      strokeLinecap: "round",
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

    timingFuncChanged(e: any) {
      this.timingFunc = e.target.value;
    },

    innerStrokeColorChanged(e: any) {
      this.innerStrokeColor = e.target.value;
    },

    stopColorChanged(e: any) {
      this.stopColor = e.target.value;
    },

    startColorChanged(e: any) {
      this.startColor = e.target.value;
    },

    strokeWidthChanged(e: any) {
      e.preventDefault();
      const val = e.target.value;

      if (!val || isNaN(val)) {
        return false;
      }

      this.strokeWidth = parseInt(val);
    },

    innerStrokeWidthChanged(e: any) {
      e.preventDefault();
      const val = e.target.value;

      if (!val || isNaN(val)) {
        return false;
      }

      this.innerStrokeWidth = parseInt(val);
    },

    diameterChanged(e: any) {
      e.preventDefault();
      const val = e.target.value;

      if (!val || isNaN(val)) {
        return false;
      }

      this.diameter = parseInt(val);
    },

    animateSpeedChanged(e: any) {
      e.preventDefault();
      const val = e.target.value;

      if (!val || isNaN(val)) {
        return false;
      }

      this.animateSpeed = parseInt(val);
    },

    totalStepsChanged(e: any) {
      e.preventDefault();
      const val = e.target.value;

      if (!val || isNaN(val)) {
        return false;
      }

      this.totalSteps = parseInt(val);
    },
    nextStep() {
      this.completedSteps += 1;
    },
    prevStep() {
      this.completedSteps -= 1;
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
  /* box-shadow: 20px 20px 60px var(--secondary), -20px -20px 60px #ffffff; */
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
}

.content__radial {
  color: white;
}

.content__radial div {
  display: flex;
  align-items: center;
}

.content__radial div small {
  font-size: 1.3rem;
  margin-right: 5px;
}

.content__radial div span {
  font-size: 2rem;
}

.content__radial div:first-child {
  margin-bottom: 5px;
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
}

.options__item {
  margin: 1rem 0;
}

.options__item span {
  margin-right: 1rem;
}
</style>
