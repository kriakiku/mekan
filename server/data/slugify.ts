import slugifyRaw from 'slugify'

export const slugify = (slug: string) => slugifyRaw(slug, {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: false,
    locale: 'vi',
    trim: true
})