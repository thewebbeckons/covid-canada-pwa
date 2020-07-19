<template>
  <div>
    <MainNav />
    <transition name="fade" appear>
      <Nuxt class="content" />
    </transition>
    <MainFooter />
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.content {
  margin-top:56px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
}
</style>
