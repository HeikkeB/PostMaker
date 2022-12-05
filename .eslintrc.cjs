module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "airbnb-base",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    rules: {
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
              ]
            }
          ],
    }
}
