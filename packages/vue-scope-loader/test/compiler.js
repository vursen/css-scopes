const path = require('path')
const webpack = require('webpack')
const memoryfs = require('memory-fs')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = (fixture, options = {}) => {
  const compiler = webpack({
    mode: 'development',
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
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {

          }
        },
        {
          test: /\.css/,
          use: [
            {
              loader: 'vue-style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: path.resolve('../css-scope-loader/index.js'),
              options: {
                defaultScopePath: './[name].vue'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
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
