import { getMenu } from "../data/menu"

export default defineEventHandler(async (event) => {
    try {
        const menu = await getMenu()
        event.res.setHeader('cache-control', 'max-age=3600,stale-while-revalidate=36000,stale-if-error=36000')
        return menu
    } catch (error) {
        event.res.setHeader('cache-control', 'no-cache')
        console.error(error)
        return <MenuResponse>{
            items: [],
            sections: []
        }
    }
})