/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable indent */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
  "extends": [
    "airbnb-base",
    "plugin:import/recommended",
  ],
    "overrides": [
    ],
    "parserOptions": {
      "parser": "@babel/eslint-parser",
      "sourceType": "module",
      "ecmaVersion": "latest",
      "ecmaFeatures": {
        "jsx": true,
        "experimentalObjectRestSpread": true,
      },
      "requireConfigFile": false,
    },
    "plugins": [
        "react",
        "eslint-plugin-import",
    ],
    "rules": {
      "react/jsx-uses-vars": "error",
        "react/jsx-uses-react": "error",
        "import/extensions": 0,
        "linebreak-style": 0,
        "eol-last": "error",
        "no-console": "off",
        "no-underscore-dangle": [
            "error",
            {
              "allow": [
                "_id",
                "__dirname",
                "__filename",
              ],
            },
          ],
    },
};
