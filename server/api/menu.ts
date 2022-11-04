import { getMenu } from "../data/menu"

export default defineEventHandler(async (event) => {
    event.res.setHeader('cache-control', 'max-age=3600')
    return await getMenu()
})