<template>
  <div class="loader-container">
    <svg
      class="spinner"
      width="65px"
      height="65px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="circle"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  </div>
</template>

<style lang="scss">
@keyframes turn {
  0% {
    stroke-dashoffset: 180;
  }

  50% {
    stroke-dashoffset: 45;
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: 180;
    transform: rotate(450deg);
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(270deg);
  }
}

.loader-container {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .circle {
    stroke-dasharray: 180;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: turn 1.35s ease-in-out infinite;
  }

  .spinner {
    animation: rotation 1.35s linear infinite;
    stroke: #797979;
  }
}
</style>