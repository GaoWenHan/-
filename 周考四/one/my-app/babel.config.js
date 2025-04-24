module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        targets: {
          browser: 'last 2 versions',
        },
      },
    ],
  ],
};
