const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nweingart12@gmail.com",
    pass: "fxplnvthohjerlwr",
  },
});

const readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: "utf-8"}, function(err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};


exports.sendEmail = functions.https.onCall((data, context) => {
  // eslint-disable-next-line max-len
  readHTMLFile(__dirname + "/email.html",
      function(err, html) {
        if (err) {
          console.log("error reading file", err);
        } else {
          const template = handlebars.compile(html);
          const replacements = {
            name: data.name,
            month: data.month,
          };
          const htmlToSend = template(replacements);
          const options = {
            from: "Update: Ned Weingart",
            to: [data.email],
            subject: "Ned's Monthly Update",
            html: htmlToSend,
          };
          transporter.sendMail(options, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Sent" + info.response);
            }
          });
        }
      });
});
