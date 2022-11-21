<template>
    <address :class="$style.address">
        <icon name="location" size="2em" :class="$style.icon" />
        <span :class="$style.title">{{t('address.title')}}</span>
        <span :class="$style.value" aria-label="Mekkan, Avrasya City, Girne, KKTC">
            Mekkan, Avrasya city, Girne
        </span>
    </address>
</template>

<script setup lang="ts">
const {t} = useI18n()
</script>

<style module lang="scss">
.address {
    display: grid;
    grid-template-areas: 
        "icon title"
        "icon value";
    grid-template-columns: 2em 1fr;
    gap: 0em 0.8em;

    font-style: normal;
    font-size: 16px;
    color: #fff;
    background-color: rgba(242, 246, 252, 0.86);
    backdrop-filter: blur(8px);
    color: #000;
    margin: 16px;
    padding: 16px;
    border-radius: 8px;

    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.7'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.icon {
    grid-area: icon;
    color: #ffb951;
    margin: auto;
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1));
}

.title {
    grid-area: title;
    font-weight: bold;
    font-size: 1.1em;
}

.value {
    grid-area: value;
    font-weight: lighter;
    font-size: 1em;
}
</style>
