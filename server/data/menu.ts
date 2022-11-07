import { parse } from 'node-html-parser';
import chroma from 'chroma-js'
// import translate from 'translate-google'
import { translate } from './translate'
import LRU from 'lru-cache'
import { Lang } from '~/types/lang';
import { slugify } from './slugify';
import emojiRegex from 'emoji-regex'

const cache = new LRU<'menu', Promise<MenuResponse>>({
  ttl: 1000 * 60 * 60,
  max: 2,
  allowStale: true,
})

const NO_IMAGE = '/no-image.png';

const $colors = chroma
  .cubehelix()
  .start(200)
  .rotations(3)
  .gamma(0.7)
  .lightness([0.3, 0.8])
  .scale()
  .domain([1,0])
  .correctLightness()
  // .lightness([0.3, 0.8])
  .colors(30);

function getColor(index: number) {
  const firstColor = `hsl(${Math.round(chroma($colors[index * 2]).hsl()[0])}, 100%, 87.5%)`;
  const secondColor = `hsl(${Math.round(chroma($colors[index * 2 + 1]).hsl()[0])}, 100%, 87.5%)`;

  return `linear-gradient(14deg, ${firstColor}, ${secondColor})`;
}

export async function getMenu(): Promise<MenuResponse> {
  if (!cache.has('menu')) {
    cache.set('menu', parseMenu())
  }

  return cache.get('menu')
}

export async function parseMenu(): Promise<MenuResponse> {
  console.log('! Parsing')

  const document = parse(
    await fetch('http://www.avrasyacity.com/restoran-menusu/').then(response => response.text()),
  )

  const $sections = document.querySelectorAll('.premium-tabs-content-section');
  const $categories = document.querySelectorAll('.premium-tabs-nav-list-item')
  const sections: Section[] = []
  const items: Item[] = []

  for (const [sectionIndex, $section] of Object.entries($sections)) {
    const $items = $section.querySelectorAll('.fmp-food-item.food-menu')
    const sectionItems: Item[] = []
    for (const [itemIndex, $item] of Object.entries($items)) {
      const origTitle = String($item.querySelector('.fmp-title h3')?.textContent || '');
      const title = origTitle.replace(emojiRegex(), '').trim();

      const item: Item = {
        $id: `m:${sectionIndex}:${itemIndex}`,
        $slug: slugify(title),
        $emoji: emojiRegex().exec(origTitle)?.[0] || null,
        image: $item.querySelector('.fmp-image-wrap img')?.getAttribute('src') || NO_IMAGE,
        title: {
          [Lang.TR]: title,
          [Lang.EN]: '',
          [Lang.RU]: '',
          [Lang.UA]: '',
        },
        price: Number($item.querySelector('.fmp-title .price')?.textContent?.replace('TL', '').trim() || 0),
        description: {
          [Lang.TR]: String($item.querySelector('.fmp-body')?.textContent || '').trim(),
          [Lang.EN]: '',
          [Lang.RU]: '',
          [Lang.UA]: '',
        }
      }
      
      sectionItems.push(item)
      items.push(item)
    }

    const $category = $categories[Number(sectionIndex)]

    const image = 
      sectionItems[sectionItems.length - 2]?.image
      || $category.querySelector('img')?.getAttribute('src')
      || NO_IMAGE

    const title = String($category.querySelector('.premium-tab-title')?.textContent || '').replace(emojiRegex(), '').trim();

    const section: Section = {
      $id: `m:${sectionIndex}`,
      $slug: slugify(title),
      $color: getColor(Number(sectionIndex)),
      image,
      title: {
        [Lang.TR]: title,
        [Lang.EN]: '',
        [Lang.RU]: '',
        [Lang.UA]: '',
      }
    }
    
    sections.push(section)
  }

  /**
   * Translate
   */
  const sectionTitles = sections.map(item => item.title[Lang.TR])
  const itemsTitles = items.map(item => item.title[Lang.TR])
  const itemsDescription = items.map(item => item.description[Lang.TR])

  for (const lang of [Lang.EN, Lang.UA, Lang.RU]) {
    const code = lang === Lang.UA ? 'uk' : lang
    const options = {from: 'tr', to: code};

    const $sectionTitles = await translate(sectionTitles, options)
    for (const [index, value] of Object.entries($sectionTitles)) {
      sections[index].title[lang] = value
    }

    const $itemsTitles = await translate(itemsTitles, options)
    for (const [index, value] of Object.entries($itemsTitles)) {
      items[index].title[lang] = value
    }

    const $itemsDescription = await translate(itemsDescription, options)
    for (const [index, value] of Object.entries($itemsDescription)) {
      items[index].description[lang] = value
    }
  }

  console.log('! Parsed')
  return {
    sections,
    items,
  }
}