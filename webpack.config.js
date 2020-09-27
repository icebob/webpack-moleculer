const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',

  entry: path.join(__dirname, 'index.js'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  node: { crypto: true, stream: true, fs: 'empty', net: 'empty', process: "mock", kleur: "mock" },

 

  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        },
        moleculer: {
          test: /moleculer.umd/,
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Moleculer in Browser'
    }),
    new webpack.ProvidePlugin({
      process: path.resolve(path.join(__dirname, "polyfills", "process")),
      kleur: path.resolve(path.join(__dirname, "polyfills", "kleur")),
    })
  ]
}
