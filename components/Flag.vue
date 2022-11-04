<template>
    <span :class="$style.flag" role="img">
        <slot />
    </span>
</template>

<style module lang="scss">
.flag {
    display: inline-block;
    aspect-ratio: 1 / 1;
    font-size: 1em;
    pointer-events: none;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(6px);
    padding: 0.117em 0.222em;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    border-radius: 8px;
}
</style>