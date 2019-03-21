const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const glob = require('glob');
const fs = require('fs');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = () => {
  const entryList = getEntry(`${__dirname}/src/app-*.js`);
  return entryList.map(page => merge(config, page));
};

const getEntry = pattern => {
  var entryList = glob.sync(pattern);

  return entryList.map(item => {
    const name = path.basename(item, '.js');

    const templatePath = path.join(path.dirname(item), `${name}.html`);

    let isExist;

    try {
      fs.accessSync(templatePath, fs.constants.F_OK);
      isExist = true;
    } catch (err) {
      isExist = false;
    }

    const config = {
      entry: {
        [name]: item
      },
      plugins: [
        new HtmlWebpackPlugin(
          Object.assign(
            {
              filename: `${name}.html`
            },
            isExist
              ? {
                  template: templatePath
                }
              : {}
          )
        )
      ]
    };

    return config;
  });
};
