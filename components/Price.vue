<template>
    <span :class="$style.price">
        {{formattedValue}} ₺
    </span>
</template>

<script setup lang="ts">
const {value} = defineProps<{
    value: number
}>()

const formattedValue = Number(value).toLocaleString()
</script>

<style module lang="scss">
.price {
    font-weight: 800;
    background: -webkit-linear-gradient(64deg, #f75c1a, #f75d65);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
