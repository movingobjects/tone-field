
const path                 = require('path'),
      CopyWebpackPlugin    = require('copy-webpack-plugin'),
      HtmlWebpackPlugin    = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev                = process.env.NODE_ENV !== 'production';

module.exports = {

  entry: {
    app: './app/src/entry.js'
  },

  output: {
    path: path.resolve(__dirname, './app/dist'),
    filename: 'resources/[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(jsx?)$/i,
        include: [
          path.resolve(__dirname, 'app'),
          path.resolve(__dirname, 'node_modules/varyd-utils')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties'
              ]

            }
          }
        ]
      },
      {
        test: /\.(html)$/i,
        include: [
          path.resolve(__dirname, 'app')
        ],
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/i,
        include: [
          path.resolve(__dirname, 'app')
        ],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          },
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: [
          path.resolve(__dirname, 'app')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'resources/images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/i,
        include: [
          path.resolve(__dirname, 'app')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'resources/fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp3|aif|aiff|wav)$/i,
        include: [
          path.resolve(__dirname, 'app')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'resources/audio/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm)$/i,
        include: [
          path.resolve(__dirname, 'app')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'resources/video/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'app/src/include', to: './' }
    ]),
    new HtmlWebpackPlugin({
      template: './app/src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "resources/styles/[name].css",
      chunkFilename: "[id].css"
    })
  ]

};
