/* colorChooser
  * A series of function that is used to pick up 3 colors among 10 dominating colors
  */
export const colorStringToRGBArray = (colorString) => colorString
  .split(',')
  .map(number => parseInt(number, 10))

export const getDistance = (a, b) => {
  const distance = a.reduce((previous, number, index) => (
    (number - b[index]) * (number - b[index])
  ), 0)
  return Math.sqrt(distance)
}

export const getDistances = (colors) => {
  return colors.map(c1 => colors.map(c2 => getDistance(c1, c2)))
}

export const chooseThreeColors = (colors) => {
  const first = colors[0]
  const distances = getDistances(colors)
  const secondIndexStart = 0
  const secondIndex = colors.reduce((previous, color, index) => (
    distances[0][index] > distances[0][previous] ? index : previous
  ), secondIndexStart)
  const second = colors[secondIndex]
  const thirdIndexStart = secondIndex + 1 >= colors.length ? 1 : secondIndex + 1
  const thirdIndex = colors.reduce((previous, color, index) => (
    index !== secondIndex && distances[0][index] > distances[0][previous] ? index : previous
  ), thirdIndexStart)
  const third = colors[thirdIndex]
  return [first, second, third]
}
