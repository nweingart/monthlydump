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
  to: ['nweingart12@gmail.com', 'ned@oos-studio.com'],
  subject: 'first automated email',
  html: '<h1>hello Ned</h1> <img src="https://i.imgur.com/7YFbH2x.jpg" />'
}

transporter.sendMail(options, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Sent" + info.response);
  }
})
