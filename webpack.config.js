/* eslint-disable no-undef */
const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/index.js","./src/style/battleship.scss"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "css/[name].min.css",
        },
        use: ["sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
