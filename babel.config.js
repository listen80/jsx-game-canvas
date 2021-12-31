module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          browsers: 'chrome >= 88',
        },
      }],
    [
      '@babel/preset-react', {
        pragma: 'this.$c',
        pragmaFrag: 'this.$c',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-jsx',
    // '@babel/plugin-transform-runtime'
  ],
}
