/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
  mount: {
    assets: { url: "/", static: true },
    src: { url: "/build" },
  },
  plugins: [
    "snowpack-lit-scss-plugin",
    "@snowpack/plugin-typescript",
    [
      "snowpack-plugin-replace",
      {
        list: [{
          from: "PRODUCTION",
          to: isProduction()
        }],
      },
    ]
  ],
  optimize: {
    minify: true,
    target: "es2018",
  },
  routes: [
    // Enables SPA fallback in development:
    { "match": "routes", "src": ".*", "dest": "/index.html" },
  ],
  devOptions: {
    port: 2797,
    open: "none",
  },
  packageOptions: {
    knownEntrypoints: ["lit-element", "@lit/reactive-element/decorators/base.js"]
  },
  alias: {
    "~services": "./src/services",
    "~components": "./src/components",
    "~utils": "./src/utils",
    "~assets": "./assets",
    "~src": "./src"
  },
};

export default config;

function isProduction() {
  return process.env.NODE_ENV === "production";
}
