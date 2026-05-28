// ESLint v9 Flat Config
// Uses eslint-config-next v16 which natively supports flat config
const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  ...nextCoreWebVitals,
  // Add any project-specific overrides below
  {
    rules: {
      // Example: suppress warnings for unused vars that start with underscore
      // "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
