import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: [`**/*.{js,mjs,cjs,ts,mts,cts}`],
        plugins: { js },
        extends: [`js/recommended`],
        languageOptions: {
            globals: { ...globals.node },
            sourceType: `module`,
        },
    },
    tseslint.configs.recommended,
    prettierConfig,
    {
        rules: {
            quotes: [`error`, `backtick`],
            "no-console": `warn`,
            "@typescript-eslint/no-unused-vars": `warn`,
        },
    },
]);
