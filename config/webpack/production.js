process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const environment = require('./environment');
const TerserPlugin = require('terser-webpack-plugin');

// Customize the optimization settings
environment.config.optimization = {
  minimize: true, // Set to `false` if you want to disable minification
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: false, // Keep console logs for debugging
          drop_debugger: false, // Keep debugger statements
        },
        mangle: false, // Disable mangling of variable names for easier debugging
        format: {
          comments: false, // Remove comments
        },
      },
      extractComments: false, // Do not extract comments to a separate file
    }),
  ],
};

module.exports = environment.toWebpackConfig();
