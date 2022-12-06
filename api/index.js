const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nweingart12@gmail.com',
    pass: 'fxplnvthohjerlwr'
  }
});

const options = {
  from: 'Update: Ned Weingart',
  to: ['nweingart12@gmail.com', 'zachames@hotmail.com'],
  subject: 'first automated email',
  html: '<h1>hello world</h1>'
}

transporter.sendMail(options, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Sent" + info.response);
  }
})
