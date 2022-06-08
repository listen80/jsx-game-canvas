const express = require('express');
const rollup  = require('express-middleware-rollup');
const path    = require('path');
const app = express();
// app.use(rollup({
//   src: 'client/js',
//   dest: 'static',
//   root: __dirname,
//   prefix: '/js'
// }));

// app.use(express.static(path.join(__dirname, 'static')));
app.use((req, res) => {
  require('child_process').exec('git pull', (error, stdout, stderr) => {
    console.log(error, stdout, stderr)
    res.send(stdout)
  })
})
app.listen(8004, '0.0.0.0', () => {
  console.log('ok')
});