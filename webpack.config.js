const path = require("path");
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "main.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  stats: {
    errorDetails: true,
  },
  watch: true,
};
