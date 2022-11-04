export enum Lang {
    TR = 'tr',
    EN = 'en',
    RU = 'ru',
    UA = 'ua'
}

export type Translatable = {
    [key in Lang]: string
}
