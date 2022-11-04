<template>
    <NuxtLayout name="default">
        <template #background>
            <div :alt="t('home.title')" :class="$style.background" />
            <PromoAddress :class="$style.address" />
        </template>

        <h1 :class="$style.title">
          {{t('home.welcome')}}
        </h1>

        <CategoryList />
    </NuxtLayout>
</template>

<script setup lang="ts">
const {t} = useI18n()

definePageMeta({
  layout: false,
});

useHead({
  title: t('home.title'),
})
</script>

<style module lang="scss">
.background {
  background-color: #fff;
  background-image: linear-gradient(0deg, #f2f6fc 0%, #e8ecf3 100%);
  height: calc(130px + env(safe-area-inset-top));
}

.address {
  position: absolute;
  top: env(safe-area-inset-top);
  left: 0;
  right: 0;
}

.title {
    margin: 0 0 0.9em 0;
    padding: 0;
    font-size: 26px;
    font-weight: bold;
    line-height: 1.1;
}
</style>
