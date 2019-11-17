const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
 
const outputDirectory = "dist";
 
module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      { test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }, 
      {
        test: /\.scss$/,
        loader: ["style-loader","css-loader","sass-loader"]
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
  },
  devServer: {
    port: 3000,
    open: false,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
