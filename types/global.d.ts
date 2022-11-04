import { Translatable } from "./lang";

export {};

declare global {

    interface Item {
        $id: string
        $slug: string
        $emoji: null | string
        image: string
        title: Translatable
        price: number
        description: Translatable
    }

    interface Section {
        $id: string
        $slug: string
        $color: string
        image: string
        title: Translatable
    }

    interface MenuResponse {
        sections: Array<Section>,
        items: Array<Item>
    }
}