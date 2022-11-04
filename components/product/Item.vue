<template>
    <li :class="$style.item" :data-slug="item.$slug">
        <img 
            :class="$style.image"
            :src="item.image"
            :alt="title"
            width="128"
            height="128"
        />

        <Flag v-if="item.$emoji" :class="$style.flag">
            {{item.$emoji}}
        </Flag>

        <div :class="$style.content">
            <span :class="$style.title">
                {{title}}
            </span>
            <span :class="$style.subtitle" v-if="subtitle" :lang="subtitle.locale">
                {{subtitle.value}}
            </span>
            <Price :class="$style.price" :value="item.price" />
        </div>

        <NuxtLink
            :class="$style.link"
            :to="localePath({ name: '~product', params: { product: item.$id } })" 
        />
    </li>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const {item} = defineProps<{
    item: Item
}>()

const title = translatable(item.title, item.$slug);
const subtitle = alternateTranslatable(item.title, item.$slug);
</script>

<style module lang="scss">
.item {
    --border-radius: 14px;
    --image-size: 100px;

    position: relative;
    display: grid;
    grid-template-areas: 
        "image description";
        grid-template-columns: 4fr 6fr;
    gap: 8px;
}

.image {
    grid-area: image;
    display: flex;
    min-height: var(--image-size);
    max-height: var(--image-size);
    min-width: 100%;
    max-width: 100%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: var(--border-radius);
    box-shadow: 
        rgba(50, 50, 93, 0.25) 0 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0 3px 7px -3px;

    object-fit: cover;
    object-position: center;
    pointer-events: none;
}

.flag {
    position: absolute;
    top: calc(var(--image-size) - 30px);
    left: 6px;
    font-size: 18px;
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

.content {
    grid-area: description;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
}

.title {
    font-size: 16px;
    font-weight: 800;
    text-transform: capitalize;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.subtitle {
    font-size: 14px;
    font-weight: 400;
    text-transform: lowercase;
    color: #9d9ea9;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}

.price {
    margin-top: auto;
}
</style>
