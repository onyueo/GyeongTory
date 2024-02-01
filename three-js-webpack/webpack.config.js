const path = require('path')

module.exports = {
  mode: 'production',
  entry: [
    './src/tory.js',
  ],
  output: {
    filename: 'bundle.js',
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
}

