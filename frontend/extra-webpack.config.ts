module.exports = {
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        loader: "babel-loader",
        enforce: "post",
        exclude: [
          /node_modules/,
          /(\\|\/)(tests?|spec|cy)\.(ts|js)$/,
        ],
        options: {
          presets: [["@babel/preset-env", { targets: "defaults" }]],
          plugins: ["istanbul"]
        }
      }
    ]
  }
};
