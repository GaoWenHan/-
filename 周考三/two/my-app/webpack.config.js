const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env.production;
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/main.jsx',
    output: {
      filename: isProduction ? '[name][contenthash:8].js' : 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
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
                    ? '[hash:base64]'
                    : '[path][name]_[local]',
                },
              },
            },
            'postcss-loader',
          ],
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
      new Dotenv({
        path: `.env.${isProduction ? 'production' : 'development'}`,
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash:8].css',
            }),
          ]
        : []),
    ],
    devServer: {
      host: 'localhost',
      port: 3000,
      open: true,
      hot: true,
    },
  };
};
