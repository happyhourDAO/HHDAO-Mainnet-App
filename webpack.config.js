const currentTask = process.env.npm_lifecycle_event

const path = require("path")

const postCSSPlugins = [require("postcss-mixins"), require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")]

let config = {
  entry: "./app/assets/scripts/app.js",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
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
      },
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
  config.output = {
    publicPath: "/",
    filename: "bundled.js",
    path: path.resolve(__dirname, "dist")
  }
  config.mode = "production"
}

module.exports = config
