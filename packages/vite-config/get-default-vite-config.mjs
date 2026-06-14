import { execSync } from "node:child_process";
import { globSync } from "node:fs";
import path, { join } from "node:path";

/**
 *
 * @param {Object} props
 * @param {string} props.root
 * @param {boolean} [props.noBundle]
 * @returns {import("vite").UserConfig}
 */
export function getDefaultViteConfig(props) {
  const { root, noBundle = false } = props;

  return {
    root,
    publicDir: false,
    resolve: {
      alias: {
        "@/": join(root, "src/"),
      },
    },
    build: {
      ssr: true,
      sourcemap: false,
      // target: [`modules`],
      outDir: "dist",
      assetsDir: ".",
      minify: true,
      emptyOutDir: false,
      reportCompressedSize: false,
      lib: {
        entry: "src/index.ts",
      },
      rolldownOptions: {
        input: !noBundle
          ? "src/index.ts"
          : Object.fromEntries(
              globSync("src/**/*.{ts,tsx}").map((file) => [
                // This removes `src/` as well as the file extension from each
                // file, so e.g. src/nested/foo.js becomes nested/foo, and
                // normalizes Windows backslashes to forward slashes.
                path
                  .relative("src", file.slice(0, file.length - path.extname(file).length))
                  .split(path.sep)
                  .join("/"),
                // This expands the relative paths to absolute paths, so e.g.
                // src/nested/foo.js becomes /project/src/nested/foo.js
                path.resolve(file),
              ]),
            ),
        output: [
          { format: "es", entryFileNames: `[name].mjs` },
          // { format: 'cjs', entryFileNames: `[name].cjs` },
        ],
        external: ["react", "react-dom", "next", "tailwindcss", "clsx", "tailwind-merge"],
      },
    },
    css: {
      modules: {
        localsConvention: "dashes",
      },
    },
    plugins: [
      {
        name: "dts-generator",
        closeBundle() {
          execSync("tsc --emitDeclarationOnly", { stdio: "inherit" });
        },
      },
    ],
  };
}
