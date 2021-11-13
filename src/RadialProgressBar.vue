<template>
  <div class="vrp__wrapper" :style="containerStyle">
    <div class="vrp__inner" :style="innerCircleStyle">
      <slot></slot>
    </div>

    <svg :width="diameter" :height="diameter" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="radial-gradient" :fx="gradient.fx" :fy="gradient.fy" :cx="gradient.cx" :cy="gradient.cy" :r="gradient.r">
          <stop offset="30%" :stop-color="startColor" />
          <stop offset="100%" :stop-color="stopColor" />
        </radialGradient>
      </defs>

      <circle
        :r="innerCircleRadius"
        :cx="radius"
        :cy="radius"
        fill="transparent"
        :stroke="innerStrokeColor"
        :stroke-dasharray="circumference"
        stroke-dashoffset="0"
        :stroke-linecap="strokeLinecap"
        :style="strokeStyle"
      ></circle>

      <circle
        :transform="'rotate(270, ' + radius + ',' + radius + ')'"
        :r="innerCircleRadius"
        :cx="radius"
        :cy="radius"
        fill="transparent"
        stroke="url('#radial-gradient')"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="circumference"
        :stroke-linecap="strokeLinecap"
        :style="progressStyle"
      ></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, reactive, ref, watch, defineComponent, PropType } from "vue";
import { StrokeLinecap, Style } from "./types";

export default defineComponent({
  props: {
    // Sets width/diameter of the inner stroke.
    diameter: {
      type: Number as PropType<number>,
      required: false,
      default: 200,
    },
    // Sets the total steps/progress to the end.
    totalSteps: {
      type: Number as PropType<number>,
      required: true,
      default: 10,
    },
    // Sets the current progress of the inner stroke.
    completedSteps: {
      type: Number as PropType<number>,
      required: true,
      default: 0,
    },
    // Sets the start color of the inner stroke (gradient).
    startColor: {
      type: String as PropType<string>,
      required: false,
      default: "#00C58E",
    },
    // Sets the end color of the inner stroke (gradient).
    stopColor: {
      type: String as PropType<string>,
      required: false,
      default: "#00E0A1",
    },
    // Sets the color of the inner stroke to be applied to the shape.
    innerStrokeColor: {
      type: String as PropType<string>,
      required: false,
      default: "#2F495E",
    },
    // Sets the width of the stroke to be applied to the shape.
    // Read more: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width
    strokeWidth: {
      type: Number as PropType<number>,
      required: false,
      default: 10,
    },
    // Sets the  width of the inner stroke to be applied to the shape.
    innerStrokeWidth: {
      type: Number as PropType<number>,
      required: false,
      default: 10,
    },
    // Sets the shape to be used at the end of stroked.
    // Read more: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
    strokeLinecap: {
      type: String as PropType<StrokeLinecap>,
      required: false,
      default: "round",
    },
    // Sets how long the animation should take to complete one cycle.
    // Read more: https://www.w3schools.com/cssref/css3_pr_animation-duration.asp
    animateSpeed: {
      type: Number as PropType<number>,
      required: false,
      default: 1000,
    },
    // Sets the frames per seconds to update inner stroke animation.
    fps: {
      type: Number as PropType<number>,
      required: false,
      default: 60,
    },
    // Sets how the animation progresses through the duration of each cycle.
    // Read more: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
    timingFunc: {
      type: String as PropType<string>,
      required: false,
      default: "linear",
    },
    // Sets the inner stroke direction.
    isClockwise: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
  },

  setup(props) {
    const gradient = reactive({
      fx: 0.99,
      fy: 0.5,
      cx: 0.5,
      cy: 0.5,
      r: 0.65,
    });

    const strokeDashoffset = ref(0);
    const currentAngle = ref(0);
    const gradientAnimation = ref<number | null>(null);

    const radius = computed(() => props.diameter / 2);
    const innerCircleDiameter = computed(() => props.diameter - props.innerStrokeWidth * 2);
    const circumference = computed(() => Math.PI * innerCircleDiameter.value);
    const stepSize = computed(() => (props.totalSteps === 0 ? 0 : 100 / props.totalSteps));
    const finishedPercentage = computed(() => stepSize.value * props.completedSteps);
    const circleSlice = computed(() => (2 * Math.PI) / props.totalSteps);
    const animationIncrements = computed(() => 100 / props.fps);
    const totalPoints = computed(() => props.animateSpeed / animationIncrements.value);
    const animateSlice = computed(() => circleSlice.value / totalPoints.value);
    const innerCircleRadius = computed(() => innerCircleDiameter.value / 2);

    const containerStyle = computed<Style>(() => ({
      height: `${props.diameter}px`,
      width: `${props.diameter}px`,
    }));

    const progressStyle = computed<Style>(() => ({
      height: `${props.diameter}px`,
      width: `${props.diameter}px`,
      strokeWidth: `${props.strokeWidth}px`,
      strokeDashoffset: strokeDashoffset.value,
      transition: `stroke-dashoffset ${props.animateSpeed}ms ${props.timingFunc}`,
    }));

    const strokeStyle = computed<Style>(() => ({
      height: `${props.diameter}px`,
      width: `${props.diameter}px`,
      strokeWidth: `${props.innerStrokeWidth}px`,
    }));

    const innerCircleStyle = computed<Style>(() => ({
      width: `${innerCircleDiameter.value}px`,
    }));

    watch(() => [props.diameter, props.totalSteps, props.completedSteps, props.strokeWidth], changeProgress, { immediate: true });

    function getPointOfCircle(angle: number) {
      const radius = 0.5;
      const x = radius + radius * Math.cos(angle);
      const y = radius + radius * Math.sin(angle);
      return { x, y };
    }

    function gotoPoint() {
      const point = getPointOfCircle(currentAngle.value);
      if (point.x && point.y) {
        gradient.fx = point.x;
        gradient.fy = point.y;
      }
    }

    function direction() {
      return props.isClockwise ? 1 : -1;
    }

    function changeProgress() {
      strokeDashoffset.value = ((100 - finishedPercentage.value) / 100) * circumference.value * direction();

      if (gradientAnimation.value) {
        clearInterval(gradientAnimation.value);
      }

      const angleOffset = (props.completedSteps - 1) * circleSlice.value;
      let i = (currentAngle.value - angleOffset) / animateSlice.value;
      const incrementer = Math.abs(i - totalPoints.value) / totalPoints.value;
      const isMoveForward = i < totalPoints.value;

      // @ts-ignore
      gradientAnimation.value = setInterval(() => {
        if ((isMoveForward && i >= totalPoints.value) || (!isMoveForward && i < totalPoints.value)) {
          gradientAnimation.value && clearInterval(gradientAnimation.value);
          return;
        }

        currentAngle.value = angleOffset + animateSlice.value * i;
        gotoPoint();

        i += isMoveForward ? incrementer : -incrementer;
      }, animationIncrements.value);
    }

    return {
      gradientAnimation,
      innerCircleRadius,
      strokeDashoffset,
      innerCircleStyle,
      containerStyle,
      circumference,
      progressStyle,
      currentAngle,
      strokeStyle,
      gradient,
      radius,
    };
  },
});
</script>

<style scoped>
.vrp__wrapper {
  position: relative;
}

.vrp__inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
