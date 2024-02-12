module.exports = {
  settings: {
    react: {
      version: "^18.2.0"
    }
  },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  env: { browser: true, es2020: true },
  ignorePatterns: [".eslintrc.cjs", "vite.config.ts"],
  rules: {
    "prettier/prettier": "warn",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-trailing-spaces": "warn",
    "semi": [ "error", "always" ],
    "quotes": [ "warn",  "double" ]
  },
};