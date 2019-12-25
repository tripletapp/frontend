import releases from '../../mocks/releases';

const releasesMap = new Map();
releases.forEach(release => {
  releasesMap.set(release.slug, JSON.stringify(release));
});

export const get = (req, res) => {
	const { slug } = req.params;
  if (releasesMap.has(slug)) {
		res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(releasesMap.get(slug));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: `Not found` }));
}
