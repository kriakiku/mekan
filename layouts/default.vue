<template>
    <main :class="$style.container">
        <header :class="$style.header">
            <!-- Background -->
            <div :class="$style.background">
                <slot name="background" />
            </div>

            <!-- Header content -->
            <div :class="$style.headerContent">
                <!-- Back -->
                <span :class="$style.action" v-if="$slots.back">
                    <icon name="back" size="2em" />
                    <slot name="back" />
                </span>

                <!-- Title -->
                <h1 :class="$style.title" v-if="$slots.title">
                    <slot name="title" />
                </h1>

                <!-- Flag -->
                <span :class="$style.flag" v-if="$slots.flag">
                    <flag>
                        <slot name="flag" />
                    </flag>
                </span>
            </div>
        </header>

        <div :class="$style.content">
            <slot />
        </div>

        <footer :class="{ [$style.footer]: true, [$style.footerStatic]: !$slots.price }">
            <div :class="$style.footerContent">
                <span :class="$style.footerValue">
                    <slot name="price">
                        <span style="font-weight: 100; font-size: 16px;" v-if="false">
                            Powered by Jonas

                            <a href="https://t.me/kriakiku">
                                <icon name="telegram" color="#229ED9" />
                            </a>
                        </span>
                    </slot>
                </span>
            </div>
        </footer>
    </main>
</template>

<script setup lang="ts">
const route = useRoute()
const { items } = await useMenu();

useHead({
    meta: () => {
        return items.map(item => ({
            rel: 'prefetch',
            href: item.image
        }))
    }
})
</script>

<style module lang="scss">
.container {
    --offset: env(safe-area-inset-top);

    flex: 1;
    // padding: 16px;

    .header {
        display: flex;
        position: relative;
        margin-top: calc(-1 * var(--offset));
        padding-top: var(--offset);
    }
}

.background {
    position: relative;
    z-index: 0;
    width: 100%;
    margin-top: calc(-1 * var(--offset));

    img {
        min-width: 100%;
        max-width: 100%;
        max-height: 50vh;
        object-fit: cover;
    }
}

.headerContent {
    position: absolute;
    top: var(--offset);
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: grid;
    grid-template-areas: 
        "action menu"
        "title  title";
    grid-template-columns: 32px 1fr;
    padding: 14px 24px 24px 24px;
}

.title {
    grid-area: title;
    align-self: end;
    position: relative;
    display: block;
    margin: 0 0 0.4em 0;
    font-size: 22px;
    font-weight: bold;
    line-height: 1.1;
}

.action {
    position: relative;
    grid-area: action;
    font-size: 0.7rem;
    color: #000;

    a {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
}

.flag {
    position: absolute;
    bottom: 36px;
    right: 24px;
    font-size: 24px;
}

.content {
    position: relative;
    z-index: 1;
    border-radius: 24px 24px 0 0;
    margin-top: -24px;
    padding: 24px 16px 24px 16px;
    background-color: #fff;
    padding-bottom: calc(56px + env(safe-area-inset-bottom));
}

.footer {
    // --left-color: #fa8d47;
    // --right-color: #f85f64;
    // --text-color: #fff;

    --left-color: #f2f6fc;
    --right-color: #e8ecf3;
    --text-color: #000;

    display: flex;
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    max-height: 56px;
    padding-bottom: env(safe-area-inset-bottom);
    background: linear-gradient(45deg, var(--left-color) 20%, var(--right-color) 80%);
    color: var(--text-color);
    font-size: 20px;
    font-weight: bold;

    transition: max-height 250ms ease;

    &::before {
        content: "";
        display: block;
        position: absolute;
        z-index: 2;
        top: -24px;
        left: 0;
        height: 24px;
        width: 24px;
        border-radius: 0 0 0 24px;
        box-shadow: -8px 10px 0px 8px var(--left-color);
    }

    &::after {
        content: "";
        display: block;
        position: absolute;
        z-index: 2;
        top: -24px;
        right: 0;
        height: 24px;
        width: 24px;
        border-radius: 0 0 24px 0;
        box-shadow: 8px 10px 0px 8px var(--right-color);
    }
}

.footerStatic {
    max-height: 14px;
}

.footerContent {
    position: relative;
    flex: 1;
    z-index: 4;
    display: flex;
    padding: 8px;
    text-align: center;
}

.footerValue {
    margin: auto;
}
</style>