import descriptors from '../../mocks/descriptors'

export const get = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(descriptors))
}
