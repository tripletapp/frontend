import descriptors from '../../mocks/descriptors'

const descriptorsMap = new Map()
descriptors.forEach(descriptor => {
  descriptorsMap.set(descriptor.slug, JSON.stringify(descriptor))
})

export const get = (req, res) => {
  const { slug } = req.params
  if (descriptorsMap.has(slug)) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(descriptorsMap.get(slug))
    return
  }
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Not found' }))
}
