const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const isProduction = env.production;
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.jsx',
    output: {
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/bundle.js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.module\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isProduction
                    ? '[hash:base64:5]'
                    : '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: isProduction
          ? 'css/[name].[contenthash:8].css'
          : 'css/[name].css',
        chunkFilename: isProduction
          ? 'css/[id].[contenthash:8].css'
          : 'css/[id].css',
        ignoreOrder: true,
      }),
    ],
    devServer: {
      open: true,
      hot: true,
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:6770',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
          secure: false,
        },
      ],
    },
  };
};
