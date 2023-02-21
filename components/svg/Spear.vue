<template>
  <svg
    id="spear"
    width="700pt"
    height="700pt"
    version="1.1"
    viewBox="0 0 700 600"
    fill="#fff"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g id="top__container">
      <path
        id="top"
        d="m358.79 278.9v-51.973c82.719 0 65.883-107.61 43.191-165.44-1.4648 56.367 21.23 147.87-43.191 147.87 0-101.75 2.9297-103.21-8.7852-209.36-10.98 106.14-8.7852 107.61-8.7852 209.36-64.418 0-40.992-91.504-42.457-147.87-23.426 57.828-40.262 165.44 42.457 165.44v51.973c-4.3906 2.1953-3.6602 13.176 1.4648 13.176h15.371c5.125 0 5.8555-10.98 0.73047-13.176z"
        fill-rule="evenodd"
      />
    </g>
    <path
      d="m340.48 295.01h19.031v2.1953h-1.4648v256.21c0 3.6602-3.6602 6.5898-8.0508 6.5898-3.6602 0-7.3203-2.9297-7.3203-6.5898v-256.21h-2.1953z"
      fill-rule="evenodd"
    />
  </svg>
</template>

<script setup></script>

<style lang="scss" scoped>
@keyframes spearAnim {
  from {
    transform: rotateY(0);
  }

  to {
    transform: rotateY(360deg);
  }
}

#spear {
  width: 100%;
  height: 100%;
}

#top {
  fill: $green;
  transform-box: fill-box;
  transform-origin: center;

  &__container {
    transition: transform 0.2s ease-in;
  }
}

#spear:hover {
  #top {
    animation: spearAnim 1s linear infinite forwards;

    &__container {
      transform: translateY(-25px);
    }
  }
}
</style>
