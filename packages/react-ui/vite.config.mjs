import { getDefaultViteConfig } from "@boom-hill-land-monorepo/vite-config/get-default-vite-config";
import react from "@vitejs/plugin-react";

const PACKAGE_ROOT = import.meta.dirname;

const defaultConfig = getDefaultViteConfig({
  root: PACKAGE_ROOT,
  noBundle: true,
});

/** @type {import('vite').UserConfig} */
const config = {
  ...defaultConfig,
  build: {
    ...defaultConfig.build,
    rolldownOptions: {
      ...defaultConfig.build?.rolldownOptions,
      external: (() => {
        // const arr = [/^@boom-hill-land-monorepo\/react-ui(\/.*)?$/];
        const arr = [];

        if (Array.isArray(defaultConfig.build?.rolldownOptions?.external)) {
          return [...defaultConfig.build.rolldownOptions.external, ...arr];
        }
        return arr;
      })(),
    },
  },
  plugins: [react(), ...defaultConfig.plugins],
};

export default config;
