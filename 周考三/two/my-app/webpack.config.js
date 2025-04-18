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
            test: /\.(css|less)$/,
            use:['style-loader','css-loader']
        },
        {
          test: /\.module\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
                loader:"css-loader",
                options:{
                    auto:true,
                    localIdentName:isProduction 
                    ? '[hash:base64]'
                    : '[path][name]_[local]'
                },
            },
            'postcss-loader'
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new Dotenv({
        path: `.env.${isProduction ? 'production' : 'development'}`,
      }),
    ],
    devServer: {
      host: 'localhost',
      port: 3000,
      open: true,
      hot: true,
    },
  };
};
