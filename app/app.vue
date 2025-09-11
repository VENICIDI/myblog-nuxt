<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: auto;
}

#app {
  min-height: 100vh;
  width: 100%;
}
</style>
