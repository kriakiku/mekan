<template>
    <nuxt-layout name="default">
        <template #background>
            <div :class="$style.background" />
        </template>

        <template #title>
            Switch language
        </template>

        <template #back>
          <nuxt-link :to="localePath({ name: 'index' })" prefetch />
        </template>

        <nuxt-link 
            v-for="lang in ['en', 'ru', 'ua', 'tr']"
            :key="lang"
            :class="$style.link"
            :to="localePath({ name: 'index' }, lang)"
            prefetch
        >
            <language :lang="lang as any" />
            <icon :class="$style.icon" name="right" />
        </nuxt-link>
    </nuxt-layout>
</template>

<script setup lang="ts">
const {t} = useI18n()
const localePath = useLocalePath()
const {getItem} = await useMenu();
const route = useRoute();

definePageMeta({
  layout: false
});

useHead({
  title: 'Switch language',
})
</script>

<style module lang="scss">
.background {
    height: calc(128px + env(safe-area-inset-top));
    background-color: #FEE140;
    background-image: linear-gradient(74deg, #FEE140 20%, #FA709A 100%);
}

.link {
    display: flex;
    padding: 24px;
    border-radius: 24px;
    background-color: #e8ecf3;
    margin-bottom: 8px;
    align-items: center;
    text-decoration: none;
    color: #000;
}

.icon {
    margin-left: auto;
}
</style>