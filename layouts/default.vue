<template>
  <div>
    <MainNav />
    <div id="content">
      <Nuxt />
    </div>
  </div>
</template>

<style>
html {
  font-family:
    'Ubuntu',
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
#content {
  margin-top:56px;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
