# Node Notification Form

The first part of the contact form deals with email notification
Simple Node.js/Express app using Nodemailer to send emails
- Please add your own SMTP info for it to work
- However If you wish run it locally you may try like this put in your service as "gmail", though its not secure as you would be required to pass in your to-email's password & to allow this first allow less secure apps in ur email account via this url-----> https://myaccount.google.com/lesssecureapps
- Apart from nodemailer we can also use mailgun to perform the email notification service.

The second part of the contact form deals with sms notification
- We have used Twilio Test Account for the same. It should be noted that for the test account the from number is: +15005550006
- You may use Twilio Account from: https://www.twilio.com/console/project/settings
- Apart from twilio other sms services could also be used like nexmo based on preference.

The third part of the contact form deals with whatsapp notification 
- We have used wbm for this as its free other paid options include twilio which could also have been used.
- However it should be noted that in order to use wbm a qr code will be generated in the terminal which needs to be scanned to send whatsapp message, however after scanning once for other messages to pass in we dont need to scan it again.
-It should be noted that wbm is an unofficial solution. It's not recommended using wbm in your company or for marketing purpose.


Schedule Job
- In third part of whatsapp notification we have used node-cron to schedule the job.
- To understand the schedule part one might refer to --->https://crontab.guru/ 
- However we can apply this schedular in other parts of notification like email, sms as well. 
- The other way to schedule the job would be to Setup Scheduled Events aka CRON Jobs with AWS Cloudwatch Events


### Version

1.0.0

## Install Dependencies

```bash
npm install 
```
## Keys
The keys which are not pushed from .env & are recommended to add your own while using it
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
API_KEY = emailpassword

## Run

```bash
nodemon app.js
```

## Future Scope
- All errors will be reflected in UI, currently its displayed only in terminal.
- Multiple Notification in one form, currently its restricted to 1 text field. However if you put in the email address seperated with , multiple notification can be done for email notification. Similarly for whatsapp & sms notification. However this is not apt way, so that will be done in a better way.

## Test Cases
- All promise functions have a catch block to handle the error.
- All mandatory parameters are made mandatory in UI
- Phone No validation in sms & whatsapp notification are done based on 12 digit, 2 digit for country code followed by 10 digit & the format is shown for end users ease.
- Code is made smooth to accomodate more such integration notification. However could be more modularised.
