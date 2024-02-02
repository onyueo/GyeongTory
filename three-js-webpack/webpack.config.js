const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/tory.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  devServer: {
    port: 9000,
    static:'./'
  },
}
