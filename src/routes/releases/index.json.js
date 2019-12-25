import releases from '../../mocks/releases'

export const get = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(releases))
}
