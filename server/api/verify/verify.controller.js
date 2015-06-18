/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Request = require('./../request/request.model');
var User = require('./../user/user.model');
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_SECRET,
  domain: process.env.MAILGUN_URL
});

// Send verification messages
exports.verify = function(req, res) {
  var smsCode = '741';
  var sendSms = function(){
    twilio.sendMessage({

        to: req.user.phone, // Any number Twilio can deliver to
        from: process.env.TWILIO_NUMBER, // A number you bought from Twilio and can use for outbound communication
        body: 'Your verification code is ' + smsCode // body of the SMS message

    }, function(err, responseData) {
        if (err) {
          console.log(err)
          res.send(403, err)
        }
        res.send(204)
    });
  }
  var sendEmail = function(email, code){
    var verifyUrl = process.env.DOMAIN + '/verify/email/' + 'code'
    var notice = {
      to: email,
      from: 'IBM Heroes HQ <donotreply@heroes.ibmthinklab.com>',
      subject: 'IBM Heroes Email Verification',
      html: 'Welcome to IBM Heroes!<br><br>To verify your IBM email, please <a href=\"' + verifyUrl + '\">click here</a> or copy and paste this link into your browser: <br><br><a href=\"' + verifyUrl + '\">' + verifyUrl + '</a><br><br>We\'re excited to work with you!<br><br>Cheers,<br>The IBM Heroes Team'
    };

    mailgun.messages().send(notice, function(error, body) {
      if (error) {
        console.log(error)
      }
      console.log(body);
    });
  }
if(req.body.type == 'mobile'){
  sendSms();
} else if (req.body.type == 'email'){
  sendEmail();
} else  {
  sendSms();
  sendEmail();
}
};

// Verify sms
exports.verifyMobile = function(req, res) {
  Request.find(function (err, requests) {
    if(err) { return handleError(res, err); }
    return res.json(200, requests);
  });
};

// Verify email
exports.verifyEmail = function(req, res) {
  Request.find(function (err, requests) {
    if(err) { return handleError(res, err); }
    return res.json(200, requests);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
