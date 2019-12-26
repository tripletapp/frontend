module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'gray-900-transparent': '#1a202caa'
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
