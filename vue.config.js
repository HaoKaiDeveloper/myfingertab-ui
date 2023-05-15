const pjson = require("./package.json");
const PACKAGE_VERSION = "'" + pjson.version + "'";
const Timestamp = new Date().getTime();
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/myfingertab-ui",
  outputDir: "myfingertab-ui",
  devServer: {
    proxy: {
      "/myfingertab": {
        target: "https://s.intella.co/",
        changeOrigin: true,
      },
    },
  },
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
    },
  },
  configureWebpack: {
    output: {
      filename: `[name]_${PACKAGE_VERSION}_${Timestamp}.js`,
      chunkFilename: `[name]_${PACKAGE_VERSION}_${Timestamp}.js`,
    },
  },
  pluginOptions: {},
});
