const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const inputStyle = require("postcss-input-style");
const MODE = process.env.WEBPACK_ENV;

const config = {
  stats: { children: false },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"development"',
    }),
    new MiniCssExtractPlugin({ filename: "styles.css" }),
  ],
  //   entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  inputStyle,
                  autoprefixer({ overrideBrowserslist: "cover 99.5%" }),
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    filename: "[name].js",
  },
};

module.exports = config;
