<template>
    <nuxt-layout name="default">
        <template #background>
          <img
            :src="item.image"
            :alt="title"
            :width="width"
            preload
        />
        </template>

        <template #back>
          <nuxt-link :to="localePath({ name: '@category', params: { category: section.$id } })" prefetch />
        </template>

        <template #flag v-if="item.$emoji">
            {{item.$emoji}}
        </template>

        <template #price>
            <price :value="item.price" />
        </template>

        <h1 :class="$style.title">{{title}}</h1>
        <span :class="$style.subtitle" v-if="subtitle" :lang="subtitle.locale">
            {{subtitle.value}}
        </span>

        <div :class="$style.description">
            <h2 :class="$style.descriptionTitle">
                {{t('product.description.title')}}
            </h2>
            <p :class="$style.descriptionParagraph" v-if="description !== title">{{ description }}</p>
            <p :class="$style.descriptionParagraph" v-if="alternateDescription?.value !== subtitle?.value" :lang="alternateDescription?.locale">{{ alternateDescription?.value }}</p>
            <template v-if="description === title && alternateDescription?.value === subtitle?.value">
                <p :class="$style.descriptionParagraph">{{t('product.description.empty')}}</p>
                <illustration value="empty-description" size="128px" :loop="false" />
            </template>
        </div>
    </nuxt-layout>
</template>

<script setup lang="ts">
const {t} = useI18n()
const localePath = useLocalePath()
const {getItem} = await useMenu()
const route = useRoute();

const {item, section} = getItem(String(route.params.product))

if (!section) {
  throw createError({ statusCode: 404, statusMessage: t('product.notFound') })
}

definePageMeta({
  layout: false
});

const title = translatable(item.title, item.$slug)
const subtitle = alternateTranslatable(item.title, item.$slug);

const description = translatable(item.description, item.$slug)
const alternateDescription = alternateTranslatable(item.description, item.$slug)

const width = computed(() => Math.min(typeof window !== 'undefined' ? window.innerWidth : 512, 512))

useHead({
  title,
})
</script>

<style module lang="scss">
.title {
    margin: 0 0 0.2em 0;
    padding: 0;
    font-size: 22px;
    font-weight: bold;
    line-height: 1.1;
}

.subtitle {
    font-size: 14px;
    font-weight: 400;
    text-transform: lowercase;
    color: #9d9ea9;
}

.description {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 14px;
}

.descriptionTitle {
    margin: 0 0 0.2em 0;
    padding: 0;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.1;
}

.descriptionParagraph {
    padding: 0;
    margin: 0;
}

</style>