<template>
    <span :lang="lang" :class="$style.language">
        <template v-if="lang === 'ru'">
            <Icon name="ru" /> Русский
        </template>
        <template v-else-if="lang === 'ua'">
            <Icon name="ua" /> Український
        </template>
        <template v-else-if="lang === 'en'">
            <Icon name="en" /> English
        </template>
        <template v-else-if="lang === 'tr'">
            <Icon name="tr" /> Türk
        </template>
    </span>
</template>

<script setup lang="ts">
const {lang} = defineProps<{
    lang: 'ru' | 'en' | 'ua' | 'tr'
}>()
</script>

<style module lang="scss">
.language {
    display: inline-block;
    svg {
       margin-right: 6px;
    }
}
</style>
