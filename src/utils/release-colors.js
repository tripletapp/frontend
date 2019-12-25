/* Credits: https://github.com/chengyin/albumcolors */

/* colorChooser
  * A series of function that is used to pick up 3 colors among 10 dominating colors
  */
const colorChooser = {
  colorStringToRGBArray (colorString) {
    let n
    const arr = colorString.split(',')

    for (n = 0; n < arr.length; n++) {
      colorString[n] = parseInt(colorString[n], 10)
    }

    return colorString
  },

  colorDistance (colorA, colorB) {
    const colorARGB = colorA
    const colorBRGB = colorB
    let distance = 0
    let n

    for (n = 0; n < colorARGB.length; n++) {
      distance += (colorARGB[n] - colorBRGB[n]) * (colorARGB[n] - colorBRGB[n])
    }

    return Math.sqrt(distance)
  },

  getDistances (colors) {
    const distances = []
    let c1
    let c2

    for (c1 = 0; c1 < colors.length; c1++) {
      distances[c1] = []
      for (c2 = 0; c2 < colors.length; c2++) {
        distances[c1][c2] = colorChooser.colorDistance(colors[c1], colors[c2])
      }
    }

    return distances
  },

  chooseThreeColors (colors) {
    const color1 = colors[0]
    const colorDistances = colorChooser.getDistances(colors)
    let color2Index = 0
    let color3Index = 1
    let c

    for (c = 0; c < colors.length; c++) {
      if (colorDistances[0][c] > colorDistances[0][color2Index]) {
        color2Index = c
      }
    }

    const color2 = colors[color2Index]
    color3Index = color2Index + 1
    if (color3Index >= colors.length) {
      color3Index = 1
    }

    for (c = 1; c < colors.length; c++) {
      if (c !== color2Index && colorDistances[0][c] > colorDistances[0][color3Index]) {
        color3Index = c
      }
    }

    const color3 = colors[color3Index]

    return [color1, color2, color3]
  }
}

/*
  * A Class for the to wrap image,
  * used for counting raw color pixels
  */
export class ReleaseImage {
  constructor (url) {
    this.url = url
  }

  fetch (callback) {
    this.image = new Image()
    this.image.onload = function () {
      if (callback) {
        callback()
        // callback(this)
      }
    }
    this.image.src = this.url
  }

  getCanvas () {
    if (this.canvas) {
      return this.canvas
    }

    const canvas = document.createElement('canvas')
    canvas.width = this.image.width
    canvas.height = this.image.height
    const context = canvas.getContext('2d')

    context.drawImage(this.image, 0, 0)

    return (this.canvas = canvas)
  }

  getPixelArray () {
    return this.getCanvas().getContext('2d').getImageData(0, 0, this.image.width, this.image.height).data
  }

  getColors () {
    if (this.colors) {
      return this.colors
    }

    let p
    const colors = []
    const pixelArray = this.getPixelArray()

    for (p = 0; p < pixelArray.length; p += 4) {
      colors.push([pixelArray[p], pixelArray[p + 1], pixelArray[p + 2]])
    }

    return (this.colors = colors)
  }
}

export default class ReleaseColors {
  constructor (imageUrl) {
    this.imageUrl = imageUrl
    this.image = new ReleaseImage(imageUrl)
  }

  getColors (callback) {
    // TODO: avoid loading image again
    this.image.fetch(() => {
      this.colors = this.extractMainColors(10)
      if (callback) {
        callback(colorChooser.chooseThreeColors(this.colors))
      }
    })
  }

  generateRGBString (color) {
    return color.join(',')
  }

  getBucket (color) {
    // Throw a color into one color bucket
    const bucket = []

    let c

    for (c = 0; c < color.length; c++) {
      // Naive
      bucket[c] = Math.round(color[c] / 64) * 64
    }

    return bucket
  }

  getColorsByBucket () {
    if (this.colorsByBucket) {
      return this.colorsByBucket
    }

    let c
    let color
    let bucket
    let rgbString

    const colors = this.image.getColors()
    const colorsByBucket = {}

    for (c = 0; c < colors.length; c++) {
      color = colors[c]
      bucket = this.getBucket(color)
      rgbString = this.generateRGBString(bucket)

      colorsByBucket[rgbString] = colorsByBucket[rgbString] || []
      if (colorsByBucket[rgbString]) {
        colorsByBucket[rgbString].push(color)
      }
    }

    return (this.colorsByBucket = colorsByBucket)
  }

  getAverageColor (colors) {
    let c
    let r = 0
    let g = 0
    let b = 0

    for (c = 0; c < colors.length; c++) {
      r += colors[c][0]
      g += colors[c][1]
      b += colors[c][2]
    }

    r = parseInt(r / colors.length, 10)
    g = parseInt(g / colors.length, 10)
    b = parseInt(b / colors.length, 10)

    return [r, g, b]
  }

  getColorBuckets () {
    if (this.colorBuckets) {
      return this.colorBuckets
    }

    const colorsByBucket = this.getColorsByBucket()
    let bucket
    const buckets = []

    for (bucket in colorsByBucket) {
      if (Object.prototype.hasOwnProperty.call(colorsByBucket, bucket)) {
        buckets.push(bucket)
      }
    }

    return (this.colorBuckets = buckets)
  }

  extractMainColors (count) {
    if (!this.mainColors) {
      const colorsByBucket = this.getColorsByBucket()
      const colorBuckets = this.getColorBuckets().slice(0)
      let b
      const mainColors = []

      colorBuckets.sort((colorBucketA, colorBucketB) => colorsByBucket[colorBucketB].length - colorsByBucket[colorBucketA].length)

      for (b = 0; b < colorBuckets.length; b++) {
        mainColors.push(this.getAverageColor(colorsByBucket[colorBuckets[b]]))
      }

      this.mainColors = mainColors
    }

    return this.mainColors.slice(0, count)
  }
}
