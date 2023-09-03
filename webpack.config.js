const currentTask = process.env.npm_lifecycle_event
const Dotenv = require("dotenv-webpack")
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const fse = require("fs-extra")

const postCSSPlugins = [require("postcss-mixins"), require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")]

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy Images", function () {
      fse.copySync("./app/assets/images", "./dist/assets/images")
    })
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [
    {
      loader: "css-loader",
      options: {
        url: false
      }
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: { plugins: postCSSPlugins }
      }
    }
  ]
}

// Shared config value

let config = {
  entry: "./app/assets/scripts/app.js",
  plugins: [new Dotenv(), new HtmlWebpackPlugin({ filename: "index.html", template: "./app/index.html" })],
  module: {
    rules: [
      cssConfig,
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
          }
        }
      }
    ]
  }
}

if (currentTask == "dev") {
  cssConfig.use.unshift("style-loader")
  config.output = {
    publicPath: "/",
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  }
  config.devtool = "source-map"
  config.devServer = {
    watchFiles: ["./app/**/*.html"],
    static: "app",
    hot: true,
    port: 3000,
    host: "0.0.0.0",
    historyApiFallback: { index: "index.html" }
  }
  config.mode = "development"
}

if (currentTask == "build") {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  config.output = {
    publicPath: "/",
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  }
  config.mode = "production"
  config.optimization = {
    splitChunks: { chunks: "all" },
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
  config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" }), new RunAfterCompile())
}

module.exports = config
