/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const isDevFunc = () => (isDev ? "source-map" : "eval");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: ["@babel/polyfill", "./js/index.js"],
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "public"),
  },
  resolve: {
    extensions: [".js", ".css", "sass", "scss"],
    alias: {
      "@modules": path.resolve(__dirname, "src/js/modules"),
      "@": path.resolve(__dirname, "src/js"),
      "@css": path.resolve(__dirname, "src/css"),
      "@sass": path.resolve(__dirname, "src/sass"),
    },
  },
  devServer: {
    port: 3000,
  },
  devtool: isDevFunc(),
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/img/*.jpg"),
          to: path.resolve(__dirname, "./public/"),
        },
        {
          from: path.resolve(__dirname, "src/img/sprite.svg"),
          to: path.resolve(__dirname, "./public/img"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                loose: true,
                modules: false,
              },
            ],
          ],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "img",
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts",
        },
      },
    ],
  },
  optimization: {
    minimize: isProd,
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
  },
};
