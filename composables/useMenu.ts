export const useMenu = async () => {
    const $img = useImage();

    const { data } = await useFetch('/api/menu', {
        server: false,
        transform: input => {
            for (const key of ['items', 'sections']) {
                for (const item of input[key]) {
                    item.image = $img(item.image, { width: 512 })
                }
            }

            return input;
        }
    })

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