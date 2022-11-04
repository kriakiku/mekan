<template>
    <div :class="$style.illustration" role="img" :aria-label="value">
        <LottieAnimation 
            :animationData="animationData"
            :height="200"
            :width="200"
            :speed="0.7"
            :loop="loop"
            autoplay
        />
    </div>
</template>

<script setup lang="ts">
import { LottieAnimation } from 'lottie-web-vue';
import * as emptyDescriptionData from '../illustrations/empty-description.json';
import * as loaderData from '../illustrations/loader.json';

// https://tlgrm.ru/stickers/catmark_anim

const {value, size, loop} = defineProps<{
    value: 'empty-description' | 'loader',
    size?: string,
    loop?: boolean
}>()

const animationData = {
    'empty-description': emptyDescriptionData,
    'loader': loaderData,
}[value]

const width = `${size || '250px'}`
</script>

<style module lang="scss">
.illustration {
    --size: min(v-bind(width), 90vw);

    display: flex;
    width: var(--size);
    height: var(--size);
    margin: 0 auto;

    svg {
        flex: 1;
    }

    &[aria-label="empty-description"] {
        transform: translateX(-20%);
    }
}
</style>