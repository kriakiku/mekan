<template>
    <nuxt-layout name="default">
        <template #background>
          <div :class="$style.background" />
        </template>

        <template #title>
          {{title}}
        </template>

        <template #back>
          <nuxt-link :to="localePath({ name: 'index' })" prefetch />
        </template>

        <product-list :items="items" />
    </nuxt-layout>
</template>

<script setup lang="ts">
const {t} = useI18n()
const localePath = useLocalePath()
const {getSection} = await useMenu()
const route = useRoute()

const {section, items} = getSection(String(route.params.category))

if (!section) {
  throw createError({ statusCode: 404, statusMessage: t('category.notFound') })
}

definePageMeta({
  layout: false
});

const color = section.$color
const title = translatable(section.title, section.$slug)

useHead({
  title,
})
</script>

<style module lang="scss">
.background {
  background: v-bind(color);
  height: calc(128px + env(safe-area-inset-top));
}
</style>