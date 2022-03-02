const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = __dirname;

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '#': _ + '/modules/',
      '~': _ + '/public/',
      '@': _ + '/src/',
    }
  },
  entry: _ + '/src/index.js',
  output: {
    path: _ + '/build',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i, exclude: /node_modules/, use: ['babel-loader']
      },
      {
        test: /\.(avi|mp4|wav|webm)$/i,
        use: [{ loader: 'file-loader', options: { outputPath: './videos', name: '[name].[ext]' } }]
      },
      {
        test: /\.(png|jpg|gif|bmp|svg)$/i,
        use: [{ loader: 'file-loader', options: { outputPath: './images', name: '[name].[ext]' } }],
      },
      {
        test: /\.(txt|pdf|hwp|xlsx|ppt|doc)$/i,
        use: [{ loader: 'file-loader', options: { outputPath: './otherFile', name: '[name].[ext]' } }]
      },
      {
        test: /\.(c|sa|sc)ss$/i, use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/i, use: ['html-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: _ + '/public/index.html',
      filename: 'index.html'
    }),
  ],
  devServer: {
    open: true
  }
}