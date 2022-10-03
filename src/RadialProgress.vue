<script lang="ts" setup>
  import { computed, reactive, ref, watch, withDefaults, defineProps } from 'vue';
  import { createId, toNumber } from './shared';
  import type { Numberish, Nullable } from './types';

  export interface Props {
    diameter?: Numberish;
    totalSteps?: Numberish;
    completedSteps?: Numberish;
    startColor?: string;
    stopColor?: string;
    innerStrokeColor?: Numberish;
    strokeWidth?: Numberish;
    innerStrokeWidth?: Numberish;
    strokeLinecap?: string;
    animateSpeed?: Numberish;
    fps?: Numberish;
    timingFunc?: string;
    isClockwise?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    diameter: 200,
    totalSteps: 10,
    completedSteps: 0,
    startColor: '#00C58E',
    stopColor: '#00E0A1',
    innerStrokeColor: '#2F495E',
    strokeWidth: 10,
    innerStrokeWidth: 10,
    strokeLinecap: 'round',
    animateSpeed: 1000,
    fps: 60,
    timingFunc: 'linear',
    isClockwise: true,
  });

  const gradient = reactive({
    fx: 0.99,
    fy: 0.5,
    cx: 0.5,
    cy: 0.5,
    r: 0.65,
  });

  const strokeDashoffset = ref(0);
  const currentAngle = ref(0);
  const gradientAnimation = ref<Nullable<number>>(null);
  const id = createId();

  const radius = computed(() => toNumber(props.diameter) / 2);
  const innerCircleDiameter = computed(() => {
    return toNumber(props.diameter) - toNumber(props.innerStrokeWidth) * 2;
  });
  const circumference = computed(() => Math.PI * innerCircleDiameter.value);
  const stepSize = computed(() => (props.totalSteps === 0 ? 0 : 100 / toNumber(props.totalSteps)));
  const finishedPercentage = computed(() => stepSize.value * toNumber(props.completedSteps));
  const circleSlice = computed(() => (2 * Math.PI) / toNumber(props.totalSteps));
  const animationIncrements = computed(() => 100 / toNumber(props.fps));
  const totalPoints = computed(() => toNumber(props.animateSpeed) / animationIncrements.value);
  const animateSlice = computed(() => circleSlice.value / totalPoints.value);
  const innerCircleRadius = computed(() => innerCircleDiameter.value / 2);

  const containerStyle = computed(() => ({
    height: `${props.diameter}px`,
    width: `${props.diameter}px`,
  }));

  const progressStyle = computed(() => ({
    height: `${props.diameter}px`,
    width: `${props.diameter}px`,
    strokeWidth: `${props.strokeWidth}px`,
    strokeDashoffset: strokeDashoffset.value,
    transition: `stroke-dashoffset ${props.animateSpeed}ms ${props.timingFunc}`,
  }));

  const strokeStyle = computed(() => ({
    height: `${props.diameter}px`,
    width: `${props.diameter}px`,
    strokeWidth: `${props.innerStrokeWidth}px`,
  }));

  const innerCircleStyle = computed(() => ({
    width: `${innerCircleDiameter.value}px`,
  }));

  watch(
    () => [props.diameter, props.totalSteps, props.completedSteps, props.strokeWidth],
    changeProgress,
    { immediate: true }
  );

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
    strokeDashoffset.value =
      ((100 - finishedPercentage.value) / 100) * circumference.value * direction();

    if (gradientAnimation.value) {
      clearInterval(gradientAnimation.value);
    }

    const angleOffset = (toNumber(props.completedSteps) - 1) * circleSlice.value;
    let i = (currentAngle.value - angleOffset) / animateSlice.value;
    const incrementer = Math.abs(i - totalPoints.value) / totalPoints.value;
    const isMoveForward = i < totalPoints.value;

    gradientAnimation.value = setInterval(() => {
      if ((isMoveForward && i >= totalPoints.value) || (!isMoveForward && i < totalPoints.value)) {
        gradientAnimation.value && clearInterval(gradientAnimation.value);
        return;
      }

      currentAngle.value = angleOffset + animateSlice.value * i;
      gotoPoint();

      i += isMoveForward ? incrementer : -incrementer;
    }, animationIncrements.value) as any;
  }
</script>

<template>
  <div class="vrp__wrapper" :style="containerStyle">
    <div class="vrp__inner" :style="innerCircleStyle">
      <slot />
    </div>

    <svg :width="diameter" :height="diameter" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient v-bind="{ id, ...gradient }">
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
        :stroke="`url('#${id}')`"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="circumference"
        :stroke-linecap="strokeLinecap"
        :style="progressStyle"
      ></circle>
    </svg>
  </div>
</template>

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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
</style>
