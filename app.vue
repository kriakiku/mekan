<template>
  <div :class="$style.container">
    <Loading v-if="!isLoaded" />
    <template v-else>
      <NuxtLoadingIndicator />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const { isLoaded } = await useMenu()

nuxtApp.hook("page:finish", () => {
     window.scrollTo(0, 0)
})

useHead({
  meta: [
    { "name": "viewport", "content": "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover" },

    { "name": "apple-touch-fullscreen", "content": "yes" },
    { "name": "apple-mobile-web-app-capable", "content": "yes" },
    { "name": "apple-mobile-web-app-status-bar-style", "content": "white-translucent" },

    { "name": "mobile-web-app-capable", "content": "yes" },
    { "name": "browsermode", "content": "application" },
    { "name": "full-screen", "content": "yes" },
    { "name": "x5-fullscreen", "content": "true" },

    { "name": "theme-color", "content": "#fff" },
    { "name": "color-scheme", "content": "light" }
  ],
  link: [
    { rel: 'manifest', href: '/_nuxt/manifest.json' }
  ]
})
</script>


<style module lang="scss">
.container {
  display: flex;
  min-height: 100vh;
  max-width: 512px;
  width: 100%;
  margin: 0 auto;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}

:global {
  html, body {
    font-family: 'Nunito', sans-serif;
  }
}
</style>