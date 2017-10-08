const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const path = require('path');
const port = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, 'build'),
  publicPath: `${config.output.publicPath}`,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    cached: false,
    cachedAssets: false
  }
}).listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at 0.0.0.0: ${port}`);
});
