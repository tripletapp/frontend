/*
  * A Class for the to wrap image,
  * used for counting raw color pixels
  */

export const getCanvas = (image) => {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)
  return canvas
}

export const getPixelArray = (image) => getCanvas(image)
  .getContext('2d')
  .getImageData(0, 0, image.width, image.height)
  .data

export const getColors = (image) => {
  const pixelArray = getPixelArray(image)
  const colors = []
  for (let p = 0; p < pixelArray.length; p += 4) {
    colors.push([pixelArray[p], pixelArray[p + 1], pixelArray[p + 2]])
  }
  return colors
}

export default (url) => new Promise((resolve) => {
  const image = new Image()
  image.onload = () => resolve(image)
  image.src = url
})
