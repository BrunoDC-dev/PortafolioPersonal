const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/submit-form', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
  
    // create a nodemailer transporter object
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bdecruz@decreditos.com',
        pass: 'hbruebkwhruzlutc'
      }
    });
  
    // define the email message
    const mailOptions = {
      from: 'bdecruz@decreditos.com',
      to: 'brunodecruz.05@gmail.com',
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
  
    // send the email using the transporter object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('Error');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Success');
      }
    });
  });
  