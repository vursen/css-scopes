const path = require('path')
const webpack = require('webpack')
const memoryfs = require('memory-fs')

module.exports = (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    resolve: {
      alias: {
        '~': path.resolve('./test/fixtures/')
      }
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: path.resolve('./index.js'),
            options
          }
        ]
      }]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

      resolve(stats);
    });
  });
};
