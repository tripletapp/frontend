const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");

const production = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require("postcss-import")(),
    require("tailwindcss"),
    require("autoprefixer"),
    production && purgecss({
      content: ["./**/*.html", "./**/*.svelte"],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    })
  ]
};
