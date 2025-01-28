export default {
  presets: [
    "@babel/preset-env", // För modern JavaScript
    "@babel/preset-typescript", // För TypeScript
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }], // För Angular-decorators
    ["@babel/plugin-proposal-class-properties", { loose: true }], // För class properties
  ],
};
