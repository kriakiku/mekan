<template>
    <section :class="$style.section">
        <h2 :class="$style.title">{{t('category.list.title')}}</h2>
        <ul :class="$style.list">
            <CategoryItem 
                v-for="item in sections"
                :key="item.$id"
                :item="item"
            />
        </ul>
    </section>
</template>

<script setup lang="ts">
const { sections } = await useMenu();
const {t} = useI18n();

// const props = defineProps<{
//     items: Section[]
// }>()
</script>

<style module lang="scss">
.section {
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0;
    display: none;
}

.list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 14px;
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
