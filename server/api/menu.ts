import { getMenu } from "../data/menu"

export default defineEventHandler(async (event) => {
    event.res.setHeader('cache-control', 'max-age=3600,stale-while-revalidate=36000,stale-if-error=36000')
    return await getMenu()
})