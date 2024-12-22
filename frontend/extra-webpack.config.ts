const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['istanbul'], // Instrumentera koden
          },
        },
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
    ],
  },
};
