const CompressionPlugin = require("compression-webpack-plugin");

new CompressionPlugin({
  filename: "[path][base].br",
  algorithm: "brotliCompress",
  test: /\.(js|css|html|svg)$/,
  compressionOptions: {
    level: 11,
  },
  threshold: 10240,
  minRatio: 0.8,
});
