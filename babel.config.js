module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          browsers: 'chrome >= 86',
        },
      }],
    [
      '@babel/preset-react', {
        pragma: 'this.$createElement',
        pragmaFrag: 'this.$createElement',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-jsx',
    // '@babel/plugin-transform-runtime'
  ],
}
