module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'gray-800-transparent': '#2d374866'
    }),
    backgroundSize: {
      125: '125%'
    },
    container: {
      center: true
    },
    extend: {}
  },
  variants: {},
  plugins: [
    require('tailwindcss-transitions')()
  ]
}
