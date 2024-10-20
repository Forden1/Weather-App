import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  
    {
      "env": {
        "node": true,        // Specifies Node.js environment
        "es6": true          // Allows modern JavaScript (ES6+)
      },
      "extends": "eslint:recommended", // Use recommended ESLint rules
      "parserOptions": {
        "ecmaVersion": 12    // Allows for modern ECMAScript features (2021)
      },
      "rules": {
        "no-undef": "error", // Disallow the use of undefined variables
        "no-unused-vars": "warn",  // Warn on unused variables
        "semi": ["error", "always"], // Enforce semicolons at the end of statements
        "quotes": ["error", "double"] // Enforce double quotes
      },
      "globals": {
        "__dirname": "readonly", // Ignore ESLint error for __dirname
        "require": "readonly",   // Ignore ESLint error for require
        "module": "readonly"     // Ignore ESLint error for module
      }
    }
    
  
  
];
