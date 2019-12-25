/* Credits: https://github.com/chengyin/albumcolors */
import fetchImage, { getColors as getImageColors } from './image'
import { chooseThreeColors } from './color-chooser'

const rgbToString = (color) => color.join(',')

const getBucket = (color) => color.map(number => Math.round(number / 64) * 64)

const getColorsByBucket = (imageColors) => imageColors.reduce((previous, color) => {
  const bucket = getBucket(color)
  const string = rgbToString(bucket)
  if (!previous[string]) {
    previous[string] = [color]
  } else {
    previous[string].push(color)
  }
  return previous
}, {})

const getAverageColor = (colors) => {
  const total = colors.reduce((previous, color) => {
    previous.r += color[0]
    previous.g += color[1]
    previous.b += color[2]
    return previous
  }, { r: 0, b: 0, g: 0 })
  return ['r', 'g', 'b'].map(component => parseInt(total[component] / colors.length, 10))
}

const extractColors = (count, imageColors) => {
  const byBucket = getColorsByBucket(imageColors)
  const buckets = Object.keys(byBucket)
  buckets.sort((a, b) => byBucket[b].length - byBucket[a].length)
  return buckets
    .map(bucket => getAverageColor(byBucket[bucket]))
    .slice(0, count)
}

export default async (imageUrl) => {
  const image = await fetchImage(imageUrl)
  const imageColors = getImageColors(image)
  const colors = extractColors(10, imageColors)
  const three = chooseThreeColors(colors)
  return three
}
