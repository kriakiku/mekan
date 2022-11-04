<template>
    <section :class="$style.section">
        <ul :class="$style.list">
            <ProductItem 
                v-for="item in items"
                :key="item.$id"
                :item="item"
            />
        </ul>
    </section>
</template>

<script setup lang="ts">
const {items} = defineProps<{
    items: Item[]
}>()

// const title = translatable(section.title)
</script>

<style module lang="scss">
.section {
    display: flex;
    flex-direction: column;
}

.list {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
