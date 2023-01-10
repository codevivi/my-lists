const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const FaviconWebPackPlugin = require("favicons-webpack-plugin");
module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "src/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    //filename: "[name].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },

  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My Lists",
      filename: "index.html",
      template: "src/index.html",
    }),
    // new MiniCssExtractPlugin({
    //   filename: "style.css",
    // }),
    //new HtmlInlineScriptPlugin(),
  ],
};
