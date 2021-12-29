<img src="https://github.com/jairoblatt/vue3-radial-progress/blob/master/demo/src/assets/demo-1.png" alt="Demo">
<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-0aa8d2" alt="MIT"/>
<img src="https://badge.fury.io/js/vue3-radial-progress.svg" alt="npm version" height="18">
  <img src="https://snyk.io/test/github/jairoblatt/vue-material-tabs/badge.svg" alt="Vulnerabilities">
  <p >A smart and light radial progress bar component for Vue 3.</p>
  <br/>
</div>

>[The original project](https://github.com/wyzantinc/vue-radial-progress) only works with Vue 1 and 2, so I decided to rewrite it for Vue 3.

### [Live Demo](https://vue3-radial-progress.vercel.app/)



## 🚚 Install

```d
 yarn add vue3-radial-progress  // npm install --save vue3-radial-progress
```

## 🚀 Usage

### Global

```javascript
import { createApp } from 'vue';
import RadialProgress from "vue3-radial-progress";

// Your app instance here
const app = createApp(App); 

app.use(RadialProgress);

```

### Local

```javascript
import RadialProgress from "vue3-radial-progress";

export default {
  components: {
    RadialProgress
  },
};
```

## 📌 Examples

```html
<template>
  <RadialProgress 
   :diameter="200"
   :completed-steps="completedSteps"
   :total-steps="totalSteps">
    <!-- Your inner content here -->
  </RadialProgress>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
    setup(){
      const completedSteps = ref(0);
      const totalSteps = ref(10);

      return {
            completedSteps,
            totalSteps
        }
    }
})
</script>
```

### Props

| Name          | type             | Default   | description                                       |
| ------------- | ---------------- | --------- | ------------------------------------------------- |
|`diameter`| number | 200 | Sets width/diameter of the inner stroke.
|`totalSteps`| number |10|  Sets the total steps/progress to the end.
|`completedSteps`| number |0|  Sets the current progress of the inner stroke.
|`startColor`| string |'#00C58E'|  Sets the start color of the inner stroke (gradient).
|`stopColor`| string |'#00E0A1'|  Sets the end color of the inner stroke (gradient).
|`innerStrokeColor`| string |'#2F495E'| Sets the color of the inner stroke to be applied to the shape.
|`strokeWidth`| number |10| Sets the width of the stroke to be applied to the shape. see: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width
|`innerStrokeWidth`| number |10| Sets the  width of the inner stroke to be applied to the shape.
|`strokeLinecap`| string |'round'| Sets the shape to be used at the end of stroked. see: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
|`animateSpeed`| number |1000| Sets how long the animation should take to complete one cycle. see: https://www.w3schools.com/cssref/css3_pr_animation-duration.asp
|`fps`| number |60 | Sets the frames per seconds to update inner stroke animation.
|`timingFunc`| string |'linear'| Sets how the animation progresses through the duration of each cycle. see: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
|`isClockwise`| boolean |true| Sets the inner stroke direction.

### Slots

| Name | Description                |
| ---- | -------------------------- |
| default | Sets the default slot inner the radial progress   |

## 🔖 License

[MIT](https://github.com/jairoblatt/vue3-radial-progress/blob/master/LICENSE)



