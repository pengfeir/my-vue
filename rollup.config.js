/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-12-01 10:59:01
 */
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
export default {
  input: "./src/index.js",
  output: {
    format: "umd",
    name: "Vue",
    file: "dist/umd/vue.js",
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    serve({
      port: 5000,
      contentBase: "",
      // openPage: "./index.html",
      openPage: "./index.html",
    }),
  ],
};
