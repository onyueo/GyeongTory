const path = require('path')

module.exports = {
  mode: 'production',
<<<<<<< HEAD
  entry: './src/tory.js',
=======
  entry: [
    './src/ex-03.js',
  ],
>>>>>>> d94658bb61b5d5fe5f5e0d474cd14d22113d1339
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  devServer: {
<<<<<<< HEAD
    port: 9000,
    static:'./'
=======
    publicPath: '/public/',
    compress: true,
    port: 9000,
    hot: true,
>>>>>>> d94658bb61b5d5fe5f5e0d474cd14d22113d1339
  },
}
