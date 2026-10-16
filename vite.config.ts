import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import babel from "vite-plugin-babel";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  fmt: {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: false,
    semi: true,
    trailingComma: "es5",
    ignorePatterns: ["/public/**/*"],
  },
  lint: {
    plugins: ["typescript", "react", "oxc", "jsx-a11y"],
    ignorePatterns: [".netlify/**"],
    rules: {
      "eslint/no-shadow": "off",
      "eslint/no-underscore-dangle": "off",
      "react/react-in-jsx-scope": "off",
      "react/rules-of-hooks": "error",
      "typescript/consistent-type-imports": "error",
      "typescript/no-explicit-any": "error",
      "react/only-export-components": [
        "off",
        {
          allowConstantExport: true,
        },
      ],
      "jsx-a11y/prefer-tag-over-role": "off",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    categories: {
      correctness: "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://viteplus.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
  },
  staged: {
    "*": "vp check --fix",
  },
  plugins: lazyPlugins(() => [
    tailwindcss(),
    reactRouter(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"],
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ]),
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
    },
  },
});
