import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["frontend/**", "backend/**"]),
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: { ...globals.node },
            sourceType: "module",
        },
    },
    tseslint.configs.recommended,
    prettierConfig,
    {
        rules: {
            quotes: ["error", "backtick"],
        },
    },
]);
