const path  = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV;

module.exports = {
    entry: ["babel-polyfill","./src/app.js"],
    output: {
        path: path.resolve(__dirname, "server/public"),
        publicPath: '/public',
        filename: "app.bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: ["style-loader", 'css-loader', "stylus-loader"],
                include: /styles/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
          })
    ],
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 9000,
	disableHostCheck: true,
        historyApiFallback: {
          index: 'index.html'
        }
      }
};
