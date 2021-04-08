const express = require("express");
const bodyParser = require("body-parser");
const webpush = require("web-push");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const wbm = require("wbm");
const schedule = require('node-schedule')
const cron = require('node-cron');


require("dotenv").config();

const app = express();

console.log(process.env);

// View engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname,"views")))

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // res.render('layouts/main.handlebars');//res.render('contact')
  res.render("layouts/main.handlebars"); //
  //res.render('contact')
});

app.post("/send", (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: 'mail.YOURDOMAIN.com',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: "gmail",
    auth: {
      user: "sinhaanwesha16@gmail.com", // generated ethereal user
      pass: process.env.API_KEY, // generated ethereal password...to allow this 1st allow less secure apps in ur email account via this url-----> https://myaccount.google.com/lesssecureapps
    },
    // tls:{
    //   rejectUnauthorized:false
    // }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "sinhaanwesha16@gmail.com", //'"Nodemailer Contact" <your@email.com>', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: `Email Notification-${req.body.company}`, // Subject line
    text: `Hi ${req.body.name}! Sending In Email Notification via nodemailer..`, // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Email has been sent" });
  });
});

app.post("/sendmessage", (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID; // 'AC48fe2e221fc2fe12f04d338113c0b36b'
  const authToken = process.env.TWILIO_AUTH_TOKEN; //'njzfpO1XQIJPBWawY1Ylcvt6UCAqJsg3'
  const client = require("twilio")(accountSid, authToken);
  //var client= new twilio(accountSid)
  client.messages
    .create({
      body:`${req.body.messagesms}`,
      from: "+15005550006",
      to: `${req.body.phone12}`,
    })
    .then((message) => console.log("found value in sms", message.sid))
    .catch((err) => console.log("error coming from sms", err));
  console.log(`SMS! Sent to ${JSON.stringify(req.body)}`);
  console.log(`SMS! Sent to 1111 ${JSON.stringify(req.body)}`);
  res.send(`SMS! Sent to ${req.body.phone12}`);
});

app.post("/sendwhatsapp", (req, res) => {
  //const mJob=schedule.scheduleJob('*/2 * * * * *',()=>{
    cron.schedule('* * * * *', () => {
  wbm.start().then(async () => {
    const phones = [` ${req.body.phonewhatsapp}`];//to send to multiple phone no seperate by ,
    const message = `${req.body.messagewhatsapp}`;
    await wbm.send(phones, message);
    console.log("whatsapp message send to",phones)
    await wbm.end();
}).catch(err => console.log("error in whatsapp",err));
  console.log(`Whatsapp! Sent to ${JSON.stringify(req.body)}`);
  res.send(`Whatsapp! Sent to ${req.body.phonewhatsapp}`);
});
console.log("i ran at the given regular expression",new Date().toString())
// mJob.cancel() 
});

const port = 6500;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
