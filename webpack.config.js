const path = require('path');

module.exports = {
    mode: 'development',
    watch:true,
    devServer: {
        contentBase: './dist'
   },
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd" 
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ]
  },
};