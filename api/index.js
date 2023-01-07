const nodemailer = require('nodemailer');
const db = require('./Firebase.js');

const docRef = db.collection("updates").doc(
  "j2isbD887inmhwanDpnc");

 const data = docRef.get().then((doc) => {
  if (doc.exists) {
    console.log("update data:", doc.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});

if (data) {
  console.log(data)
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nweingart12@gmail.com',
    pass: 'fxplnvthohjerlwr'
  }
});

const user = {
  first: 'Ned',
  last: 'Weingart'
}

const options = {
  from: `Update${user.first}`,
  to: ['nweingart12@gmail.com'],
  subject: 'first automated email',
  html: '<div></div>'
}

transporter.sendMail(options, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Sent" + info.response);
  }
})
