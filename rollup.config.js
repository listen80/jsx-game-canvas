import commonjs from "@rollup/plugin-commonjs"; // 使用commonjs
import resolve from "@rollup/plugin-node-resolve"; // 加载第三方库
import babel from "@rollup/plugin-babel"; // 转成es5
import alias from "@rollup/plugin-alias";

import { terser } from "rollup-plugin-terser"; // 压缩代码
import serve from "rollup-plugin-serve"; // 启动服务

import replace from "rollup-plugin-replace"; // 注入环境变量
import html2 from "rollup-plugin-html2";

// import postcss from 'rollup-plugin-postcss';
// import vue from 'rollup-plugin-vue' // 处理vue的插件ƒ
// import livereload from 'rollup-plugin-livereload' // 实时刷新

const p = new Proxy(
  {
    tag: "script",
    src: "bundle.js",
  },
  {
    get(target, prop) {
      const date = new Date();
      if (prop === "src") {
        return (
          target[prop] +
          `?${date.toLocaleDateString()}@${date.toTimeString().substring(0, 8)}`
        );
      }
      return target[prop];
    },
    set(obj, prop, value) {
      obj[prop] = value;
    },
  }
);

const plugins = [
  alias({
    entries: {
      Engine: require("path").resolve("src/Engine"),
    },
  }),
  commonjs(),
  resolve({
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  }),
  babel({
    babelHelpers: "bundled", // 多次使用辅助函数只保留一个  比如 class 在转换成es5时会使用多个辅助函数则只保留一个
  }),
  // jsx({
  //   factory: 'h',
  // }),
  // postcss(),
  // vue(),
  html2({
    template: "src/index.html",
    inject: false,
    externals: { after: [p] },
  }),
];

if (process.env.NODE_ENV === "development") {
  plugins.push(
    serve({
      // open: true,
      port: 9999,
      contentBase: "public",
    })
  );
} else {
  plugins.push(terser());
}

export default {
  plugins,
  input: {
    bundle: "src/index",
    // Engine: "src/Engine/index.js",
  },
  // input:  "src/Mota/index.jsx",
    // Engine: "src/Engine/index.js",
  output: {
    // file: 'public/bundle.js',
    // format: "umd",
    dir: "public/",
  },
  // output: {
  //   Mota: "dasd.js",
  //   Engine: "issdsndex.js",
  // },
};
