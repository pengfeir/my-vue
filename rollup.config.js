/*
 * @Date: 2020-11-16 14:33:53
 * @LastEditors: pengfei
 * @LastEditTime: 2020-11-30 15:41:35
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
      port: 3000,
      contentBase: "",
      // openPage: "./index.html",
      openPage: "./2.html",
    }),
  ],
};
