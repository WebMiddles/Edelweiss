const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/js/main.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "pubilc"),
  },
  devServer: {
    port: 3000,
  },
};
