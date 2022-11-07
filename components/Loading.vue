<template>
    <div :class="$style.loading">
        <illustration value="loader" loop />
    </div>
</template>

<style module lang="scss">
.loading {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
}
</style>