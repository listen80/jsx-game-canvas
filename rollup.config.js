import commonjs from '@rollup/plugin-commonjs' // 使用commonjs
import resolve from '@rollup/plugin-node-resolve' // 加载第三方库
import babel from '@rollup/plugin-babel' // 转成es5
import alias from '@rollup/plugin-alias'

import { terser } from 'rollup-plugin-terser' // 压缩代码
import serve from 'rollup-plugin-serve' // 启动服务

import replace from 'rollup-plugin-replace' // 注入环境变量
// import postcss from 'rollup-plugin-postcss';
// import vue from 'rollup-plugin-vue' // 处理vue的插件ƒ
// import livereload from 'rollup-plugin-livereload' // 实时刷新

import html2 from 'rollup-plugin-html2'
import path from 'path'
const date = new Date()

export default {
  input: path.join('src'),
  output: {
    file: 'public/bundle.js',
  },
  plugins: [
    alias({
      entries: {
        Engine: path.resolve('src/Engine'),
      },
    }),
    commonjs(),
    resolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    babel({
      babelHelpers: 'bundled', // 多次使用辅助函数只保留一个  比如 class 在转换成es5时会使用多个辅助函数则只保留一个
    }),
    // jsx({
    //   factory: 'h',
    // }),
    // postcss(),
    // vue(),
    html2({
      template: 'src/index.html',
      inject: false,
      externals: {
        before: [],
        after: [{
          tag: 'script',
          src: 'bundle.js?' + `${date.toLocaleDateString()}-${date.toTimeString().substring(0, 9)}`,
        }],
      },
    }),
    process.env.NODE_ENV === 'production'
      ? terser()
      : serve({
        // open: true,
        port: 8080,
        contentBase: 'public',
      }),
  ],
  sourceMap: false,
}
