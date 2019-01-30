const ip = require('ip');
const qrcode = require('qrcode');
const app = require('./app');
const token = require('./token');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  const link = `http://${ip.address('public')}:${port}/?token=${token}`;
  console.log(`link:${link}`);
  qrcode.toString(link, {type: 'terminal'}, (err, code) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(code);
  })
});

