function extractor(content) {
  const matches = content.match(/[A-Za-z0-9-_:/]+/g) || [];
  const res = matches.map((match) => {
    if (match.startsWith("class:")) {
      return match.split(":")[1];
    }
    return match;
  });
  return res;
}

// only needed if you want to purge
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.svelte", "./src/**/*.html"],
  //css: ["./public/tailwind.css"],
  whitelistPatterns: [/svelte-/],
  defaultExtractor: (content) => extractor(content),
});

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-url")(),
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer")({ browsersList: ["defaults"] }),

    // only needed if you want to purge
    ...(production ? [purgecss] : []),
  ],
  extract: true,
};
