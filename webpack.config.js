const path = require("path")

const postCSSPlugins = [require("postcss-mixins"), require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")]

module.exports = {
  entry: "./app/assets/scripts/app.js",
  output: {
    publicPath: "/",
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  },
  devtool: "source-map",
  devServer: {
    watchFiles: ["./app/**/*.html"],
    static: "app",
    hot: true,
    port: 3000,
    host: "0.0.0.0",
    historyApiFallback: { index: "index.html" }
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
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
