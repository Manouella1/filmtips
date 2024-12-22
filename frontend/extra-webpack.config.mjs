import path from "path";

export default {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            plugins: ["istanbul"], // Instrumentera koden
          },
        },
        exclude: [path.resolve(path.dirname(""), "node_modules")],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
