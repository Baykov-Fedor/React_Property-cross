const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].js",
    publicPath: "",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  // devServer: {
  //   contentBase: path.join(__dirname, "dist"),
  //   publicPath: "/",
  //   compress: true,
  //   port: 9000,
  //   watchContentBase: true,
  //   progress: true,
  //   hot: true,
  //   open: true,
  //   historyApiFallback: true,
  // },
  optimization: {
    splitChunks: {
      // Чанки для нашего приложения. Все наши npm-пакеты вынесем в отдельный файл с определенным хешем,
      // чтобы клиент каждый раз при изменениях не выкачивал все по-новой
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
    minimizer: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};
