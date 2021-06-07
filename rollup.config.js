import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

import packageJson from "./package.json";

export default {
  input: "./src/index.js",
  output: [
    {
      file: packageJson.main,
      format: "es",
      sourcemap: false,
    },
  ],
  plugins: [
    json(),
    commonjs(),
    resolve({ browser: true, preferBuiltins: false }),
  ],
};
