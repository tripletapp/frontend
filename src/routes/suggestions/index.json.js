import allDescriptors from '../../mocks/descriptors'
import allReleases from '../../mocks/releases'

const anyIncludes = (properties, string) => properties.some(property => String(property).toLowerCase().includes(string))

export const get = (req, res) => {
  const data = []
  const query = req.query.query.toLowerCase()
  const descriptors = allDescriptors
    .filter(({ name }) => anyIncludes([name], query))
    .map(({ id, slug, name }) => ({ id, slug, name }))
  const releases = allReleases
    .filter(({ artist, title, year }) => anyIncludes([artist, title, year], query))
    .map(({ id, slug, title, artist }) => ({ id, slug, name: `${artist} - ${title}` }))
  if (descriptors.length > 0) {
    data.push({ name: 'Descriptors', items: descriptors })
  }
  if (releases.length > 0) {
    data.push({ name: 'Releases', items: releases })
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}
