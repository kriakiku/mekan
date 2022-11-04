export const useMenu = async () => {
    const { data } = await useFetch('/api/menu', { server: false })
    const isLoaded = computed(() => {
        return data.value && data.value.items.length > 0
    });


    const getSection = ($id: string) => {
        return {
            section: data.value?.sections?.find?.(item => item.$id === $id) || null,
            items: data.value?.items?.filter?.(item => item.$id.startsWith(`${$id}:`)) || null
        }
    }

    const getItem = ($id: string) => {
        return {
            item: data.value?.items?.find?.(item => item.$id === $id) || null,
            section: data.value?.sections?.find?.(item => $id.startsWith(`${item.$id}:`)) || null
        }
    }

    return {
        ...data.value,
        getSection,
        getItem,
        isLoaded,
    }
}