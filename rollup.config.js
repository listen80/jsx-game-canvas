import commonjs from '@rollup/plugin-commonjs' // 使用commonjs
import resolve from '@rollup/plugin-node-resolve' // 加载第三方库
import babel from '@rollup/plugin-babel' // 转成es5
import alias from '@rollup/plugin-alias'

import { terser } from 'rollup-plugin-terser' // 压缩代码
import serve from 'rollup-plugin-serve' // 启动服务

import replace from 'rollup-plugin-replace' // 注入环境变量

const plugins = [
  alias({
    entries: {
      Engine: require('path').resolve('src/Engine'),
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
]

if (process.env.NODE_ENV === 'development') {
  plugins.push(
    serve({
      // open: true,
      port: 8010,
      contentBase: 'public',
    }),
  )
} else {
  plugins.push(terser())
}

export default {
  plugins,
  input: {
    game: 'src/',
  },
  output: {
    dir: 'public/Bundle',
  },
}
