const {builtinModules} = require("node:module");

/**
 * @type {import('eslint-define-config').ESLintConfig}
 */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
  plugins: ["import", "@typescript-eslint"],
  rules: {
    "no-debugger": "error",
    "no-console": ["error", {allow: ["warn", "error", "info"]}],
    "sort-imports": ["error", {ignoreDeclarationSort: true}],
    "import/no-nodejs-modules": ["error", {allow: builtinModules.map((mod) => `node:${mod}`)}],
    "@typescript-eslint/prefer-ts-expect-error": "error",
    // Enforce the use of 'import type' for importing types
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        fixStyle: "inline-type-imports",
        disallowTypeAnnotations: false,
      },
    ],
    // Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers
    "@typescript-eslint/no-import-type-side-effects": "error",
  },
  overrides: [
    // JavaScript files
    {
      files: ["*.js", "*.cjs"],
      rules: {
        // We only do `no-unused-vars` checks for js files, TS files are checked by TypeScript itself.
        "no-unused-vars": ["error", {vars: "all", args: "none"}],
      },
    },
    // Node scripts
    {
      files: ["scripts/**", "./*.{js,ts}"],
      rules: {
        "no-restricted-globals": "off",
        "no-console": "off",
      },
    },
  ],
};
