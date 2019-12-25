module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      navbar: '#2d374866'
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
