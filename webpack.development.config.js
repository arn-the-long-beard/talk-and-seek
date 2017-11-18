const path = require('path')
const webpack = require('webpack')
module.exports = [
  {

    name: 'client',
    target: 'web',
    entry: './client.jsx',
    output: {
      path: path.join(__dirname, 'static'),
      filename: 'client.js',
      publicPath: '/static/'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules\/)/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            'url-loader?limit=10000',
            'img-loader'
          ]
        }
      ]
    }
  },
  {
    name: 'server',
    target: 'node',
    entry: './server.jsx',
    output: {
      path: path.join(__dirname, 'static'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/static/'
    },
    devtool: 'source-map',
    plugins: [ new webpack.DefinePlugin({ 'global.GENTLY': false }), new webpack.IgnorePlugin(/utf-8-validate|bufferutil/) ],

   /* plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      })
    ], */
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules\/)/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: 'isomorphic-style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            'url-loader?limit=10000',
            'img-loader'
          ]
        }
      ]
    },
    externals: ['formidable', 'ws', 'isomorphic-fetch', 'fetch']
  }
]
