const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin"); // 引入 TerserPlugin

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const path = require("path");
// const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;
  config.devtool = false; // 关掉 sourceMap js.map

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  config.module.rules.unshift({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false, // disable the behavior
    },
  });

  // 添加 TerserPlugin 配置
  // config.optimization = {
  //   ...config.optimization,
  //   minimize: true, // 启用压缩
  //   minimizer: [
  //     new TerserPlugin({
  //       terserOptions: {
  //         compress: {
  //           drop_console: true, // 移除所有 console 语句
  //         },
  //       },
  //     }),
  //   ],
  // };

  return config;
};
