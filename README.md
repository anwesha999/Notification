# Node Notification Form

The first part of the contact form deals with email notification
Simple Node.js/Express app using Nodemailer to send emails
- Please add your own SMTP info for it to work
- However If you wish run it locally you may try like this put in your service as "gmail", though its not secure as you would be required to pass in your to-email's password & to allow this first allow less secure apps in ur email account via this url-----> https://myaccount.google.com/lesssecureapps

The other part of the contact form deals with sms notification
- We have used Twilio Test Account for the same. It should be noted that for the test account the from number is: +15005550006
- You may use Twilio Account from: https://www.twilio.com/console/project/settings
- Apart from twilio other sms services could also be used like nexmo based on preference

### Version

1.0.0

## Install Dependencies

```bash
npm install 
```

## Run

```bash
nodemon app.js
```