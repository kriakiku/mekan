<template>
    <li :class="$style.item" :data-slug="item.$slug">
        <div :class="$style.image">
            <nuxt-img
                :src="item.image"
                :alt="title"
                width="128"
                height="128"
            />
        </div>
        <span :class="$style.title">
            {{title}}
        </span>
        <NuxtLink
            :class="$style.link"
            :to="localePath({ name: '@category', params: { category: item.$id } })" 
        />
    </li>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const {item} = defineProps<{
    item: Section
}>()

const color = item.$color;
const title = translatable(item.title, item.$slug);
</script>

<style module lang="scss">
.item {
    --border-radius: 14px;

    position: relative;
    display: flex;
    flex-direction: column;
    aspect-ratio: 1 / 1.1;
}

.title {
    position: relative;
    z-index: 1;
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    margin: 8px 8px 12px 8px;
}

.image {
    display: flex;
    width: 100%;
    height: 70%;
    background: v-bind(color);
    border-radius: var(--border-radius);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    img {
        --size: calc(100% - 8px);
        margin: auto;
        min-height: var(--size);
        max-height: var(--size);
        min-width: var(--size);
        max-width: var(--size);
        flex: 1;
        margin-top: auto;
        border-radius: var(--border-radius);
        object-fit: cover;
        object-position: center;
        pointer-events: none;
    }
}

.link {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: var(--border-radius);
}
</style>
