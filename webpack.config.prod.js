const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.common");
module.exports = merge(common, {
  mode: "none",
  plugins: [new HtmlInlineScriptPlugin()],
});
