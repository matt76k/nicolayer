module.exports = {
  entry: './src/index.ts',
  devtool: "source-map",
  output: {
      filename: './public/dist/bundle.js'
  },
  resolve: {
      extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader'}
    ]
  }
};
