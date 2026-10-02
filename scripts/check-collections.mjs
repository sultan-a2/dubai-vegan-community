import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { products, productCategories, places, placesToConfirm, supermarkets, homepagePlaces } from '../src/data/directory.js'

const recipes = JSON.parse(readFileSync(new URL('../src/data/recipes.json', import.meta.url)))
assert.equal(new Set(products.map((item) => item.url)).size, products.length)
assert.equal(new Set(recipes.map((item) => item.slug)).size, recipes.length)
for (const product of products) {
  assert(productCategories.includes(product.category), `Missing category: ${product.name}`)
  assert.notEqual(product.category, 'All')
  if (product.image) assert(existsSync(new URL(`../public/assets/${product.image}`, import.meta.url)), product.image)
  else assert.equal(product.communityLink, true, `Unmarked product without photo: ${product.name}`)
}
for (const category of productCategories.slice(1)) assert(products.some((item) => item.category === category), `Empty category: ${category}`)
assert(products.filter((item) => item.brand === 'Switch').every((item) => item.category === 'Meat alternatives'))
assert(products.filter((item) => /tofu|tempeh/i.test(item.name)).every((item) => item.category === 'Tofu & tempeh'))
for (const recipe of recipes) {
  assert(existsSync(new URL(`../public/assets/${recipe.image}`, import.meta.url)), recipe.image)
  assert(existsSync(new URL(`../public/recipes/${recipe.slug}.pdf`, import.meta.url)), recipe.slug)
}
assert.equal(new Set(places.map((item) => item.name)).size, places.length)
for (const place of places) {
  assert(['Vegan', 'Vegetarian', 'Vegan friendly'].includes(place.type), place.name)
  assert(place.menuUrl && place.cuisines.length && place.moods.length, place.name)
  if (place.image) assert(existsSync(new URL(`../public/assets/${place.image}`, import.meta.url)), place.image)
}
for (const item of [...products, ...places, ...placesToConfirm, ...supermarkets]) assert.equal(new URL(item.url).protocol, 'https:')
assert.equal(supermarkets.length, 7)
assert.equal(places.find((item) => item.name === "MyGovinda's").type, 'Vegetarian')
console.log(`${products.length} products, ${places.length} places, ${placesToConfirm.length} suggestions, ${supermarkets.length} shops and ${recipes.length} recipes: OK`)

assert(!places.some(place => /wild.*moon/i.test(place.name)))
assert.deepEqual(homepagePlaces.map(place => place.name), ["Dobro", "SEVA Table", "Nuttino Bakehouse"])
for (const place of homepagePlaces) assert(place.url && place.detail, place.name)
