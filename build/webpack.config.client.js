const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development'
const devServer={
    port: 8000,
    host: '127.0.0.1',
    overlay: {
      errors: true,
    },
    hot: true
  }

let config
const defaultPlugins=[
    new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isDev ? '"development"' : '"production"'
        }
      }),
    new HTMLPlugin()
]
if (isDev) {
    config=merge(baseConfig,{
        devtool: '#cheap-module-eval-source-map',
        module:{
            rules:[
                {
                    test: /\.styl/,
                    use: [
                      'vue-style-loader',
                      {
                          loader:'css-loader',
                        //   options:{  // 全局样式cssModule 的形式 不常用
                        //     localIdentName:isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
                        //     module:true
                        //   }
                      },
                      {
                        loader: 'postcss-loader', //前缀
                        options: {
                          sourceMap: true,
                        }
                      },
                      'stylus-loader'
                    ]
                }
            ]
        },
        devServer,
        plugins:defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config=merge(baseConfig,{
        entry:{
          app: path.join(__dirname, '../client/index.js'),
          vendor: ['vue']
        },
        output:{
            filename:'[name].[chunkhash:8].js '
        },
        module:{
            rules:[
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                      fallback: 'vue-style-loader', //不用style-loader 因为没有样式的热重载
                      use: [
                        'css-loader',
                        {
                          loader: 'postcss-loader',
                          options: {
                            sourceMap: true,
                          }
                        },
                        'stylus-loader'
                      ]
                    })
                }
            ]
        },
        plugins:defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
              name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
              name: 'runtime'
            })
        ])
    })
}

module.exports = config
