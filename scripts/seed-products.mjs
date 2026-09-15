import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const API_URL = process.env.API_URL || 'http://localhost:3000/api'
const ADMIN_TOKEN = process.env.ADMIN_TOKEN

if (!ADMIN_TOKEN) {
  console.error('Thiếu ADMIN_TOKEN. Chạy: ADMIN_TOKEN=xxx node scripts/seed-products.mjs')
  process.exit(1)
}

const productsFilePath = path.resolve(__dirname, '../src/constants/products.ts')
const source = readFileSync(productsFilePath, 'utf-8')

const imagesDir = path.resolve(__dirname, '../src/assets/images')

const imageMap = new Map()
const importRegex = /import\s+(\w+)\s+from\s+'\.\.\/assets\/images\/([\w.]+)'/g
let importMatch
while ((importMatch = importRegex.exec(source))) {
  imageMap.set(importMatch[1], importMatch[2])
}

const productBlockRegex = /\{\s*id:\s*'[^']+'[\s\S]*?bestseller:\s*(?:true|false),?\s*\}/g
const blocks = source.match(productBlockRegex) || []

const parseField = (block, regex) => {
  const match = block.match(regex)
  return match ? match[1] : null
}

const products = blocks.map((block) => {
  const name = parseField(block, /name:\s*'([^']+)'/)
  const description = parseField(block, /description:\s*\n?\s*'([^']+)'/)
  const price = Number(parseField(block, /price:\s*(\d+)/))
  const category = parseField(block, /category:\s*'([^']+)'/)
  const subCategory = parseField(block, /subCategory:\s*'([^']+)'/)
  const bestseller = parseField(block, /bestseller:\s*(true|false)/) === 'true'

  const imageVarsRaw = parseField(block, /image:\s*\[([^\]]+)\]/) || ''
  const imageVars = imageVarsRaw
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
  const images = imageVars
    .map((v) => imageMap.get(v))
    .filter(Boolean)
    .map((filename) => path.join(imagesDir, filename))

  const sizesRaw = parseField(block, /sizes:\s*\[([^\]]+)\]/) || ''
  const sizes = sizesRaw
    .split(',')
    .map((s) => s.trim().replace(/^'|'$/g, ''))
    .filter(Boolean)

  return { name, description, price, category, subCategory, bestseller, sizes, images }
})

console.log(`Tìm thấy ${products.length} sản phẩm, bắt đầu upload...`)

let success = 0
let failed = 0

for (const product of products) {
  try {
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('price', String(product.price))
    formData.append('category', product.category)
    formData.append('subCategory', product.subCategory)
    formData.append('sizes', JSON.stringify(product.sizes))
    formData.append('bestseller', String(product.bestseller))

    for (const imagePath of product.images) {
      const buffer = readFileSync(imagePath)
      const blob = new Blob([buffer], { type: 'image/png' })
      formData.append('images', blob, path.basename(imagePath))
    }

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`)
    }

    success += 1
    console.log(`✔ ${product.name}`)
  } catch (error) {
    failed += 1
    console.error(`✘ ${product.name}: ${error.message}`)
  }
}

console.log(`Xong: ${success} thành công, ${failed} thất bại.`)