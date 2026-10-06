import { createElement } from 'react'
import Search01Icon from '@hugeicons/core-free-icons/Search01Icon'
import Calendar03Icon from '@hugeicons/core-free-icons/Calendar03Icon'
import ArrowDown01Icon from '@hugeicons/core-free-icons/ArrowDown01Icon'
import ArrowUpRight01Icon from '@hugeicons/core-free-icons/ArrowUpRight01Icon'
import Restaurant01Icon from '@hugeicons/core-free-icons/Restaurant01Icon'
import BookOpen01Icon from '@hugeicons/core-free-icons/BookOpen01Icon'
import ShoppingBasket01Icon from '@hugeicons/core-free-icons/ShoppingBasket01Icon'

const icons = { search: Search01Icon, calendar: Calendar03Icon, chevron: ArrowDown01Icon, arrow: ArrowUpRight01Icon, food: Restaurant01Icon, book: BookOpen01Icon, basket: ShoppingBasket01Icon }
export default function SiteIcon({ name, size = 22, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{icons[name].map(([tag, attributes], index) => createElement(tag, { ...attributes, key: index }))}</svg>
}
