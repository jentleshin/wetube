// eslint-disable-next-line
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, //__dirname, process, etc
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
};
