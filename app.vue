<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 1s;
}

.page-enter-active + .sidebar .matrix-container {
  border: 3px solid red;

  /* animation: 0.5s mobileExtented; */
  /* Header */
  /* height: calc(100vh - 4rem); */

  /* @include tablet-landscape { */
  /*   header + container padding */
  /*   height: calc(100vh - 6rem); */
  /*   right: 0; */
  /*   border-radius: 0; */
  /*   animation: none; */
  /* } */
}

.page-leave-active + .sidebar .matrix-container {
  height: calc(100vh - 4rem);
  width: 100vw;
  z-index: 5;

  @include tablet-landscape {
    height: calc(100vh - 6rem);
    right: 0;
    border-radius: 0;
  }
}

/* .page-enter-from + .sidebar, */
/* .page-leave-to + .sidebar { */
/*   .matrix-container { */
/*     /* animation: 0.5s mobileExtented; */
/*     /* Header */
/*     height: calc(100vh - 4rem); */
/**/
/*     @include tablet-landscape { */
/*       /* header + container padding */
/*       height: calc(100vh - 6rem); */
/*       right: 0; */
/*       border-radius: 0; */
/*       animation: none; */
/*     } */
/*   } */
/* } */
</style>
