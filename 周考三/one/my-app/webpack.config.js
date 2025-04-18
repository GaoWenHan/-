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
      filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
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
                    auto: true, // 启用CSS模块化
                    localIdentName: isProduction
                    ? '[hash:base64]' // 生产环境:生成短哈希类名(减少代码体积)
                    : '[path][name]_[local]' // 开发环境:生成带有路径和文件名的类名(便于调试)
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
        filename:isProduction 
        ? 'css/[name].[contenthash:8].css'
        : 'css/[name].css',
        chunkFilename:isProduction
        ? 'css/[id].[contenthash:8].css'
        : 'css/[id].css',
        ignoreOrder: true, // 忽略顺序
      }),
      new Dotenv({
        path: `.env.${isProduction ? 'production' : 'development'}`,
        systemvars: true, // 允许读取环境变量
        safe: true, // 如果读取不到,则报错
        defaults: true, // .env.defaults做为后备
        allowEmptyValues: true, // 禁用空值
      }),
    ],
    devServer: {
      host: 'localhost',
      port: 3001,
      open: true,
      hot: true,
      proxy: [
        {
          context: ['/api'], // 代理路径
          target: 'http://localhost:3000', // 目标服务器
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
          secure: false
        }
      ]
    },
  };
};
