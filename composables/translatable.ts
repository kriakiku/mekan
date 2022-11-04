import { Lang, Translatable } from "~/types/lang";

export function translatable(value: Translatable, slug?: string, forceLocale?: Lang) {
    const {locale, te, t} = useI18n();

    let pickedLocale = forceLocale ? forceLocale : locale.value

    if (slug && te(`custom.${slug}`, pickedLocale)) {
        return t(`custom.${slug}`);
    }

    if (forceLocale) {
        return value[pickedLocale] || null    
    }
    
    return value[pickedLocale] || value['en'] || value['tr'] || value['ru'] || value['ua'] || ''
}

export function alternateTranslatable(value: Translatable, slug?: string) {
    const {locale} = useI18n();
    const pickedLocale = locale.value === 'tr' ? Lang.EN : Lang.TR
    const original = translatable(value, slug)
    const translated = translatable(value, slug, pickedLocale)

    if (translated === original || !translated) {
        return null
    }

    return {
        locale: pickedLocale,
        value: translatable(value, slug, pickedLocale)
    }
}