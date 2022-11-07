<template>
    <nuxt-link to="/language" prefetch role="alert" :class="$style.alert">
        <language :lang="locale as any" />
        <span :class="$style.info">(click to pick language)</span>
        <icon :class="$style.icon" name="right" />
    </nuxt-link>
</template>

<script setup lang="ts">
const {locale} = useI18n();
</script>

<style module lang="scss">
.alert {
    display: flex;
    background: #f2f8ff;
    color: #000;
    text-decoration: none;
    padding: 24px;
    border-radius: 24px;
    margin-bottom: 24px;
    align-items: center;
}

.icon {
    margin-left: auto;
}

.info {
    margin-left: 6px;
    font-size: small;
}
</style>