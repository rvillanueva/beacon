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
var Mission = require('./../mission/mission.model');
var User = require('./../user/user.model');
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_SECRET,
  domain: process.env.MAILGUN_URL
});
var randomstring = require("randomstring");


// Send email verification
exports.email = function(req, res) {

  var emailCode;
  var generateCode = function() {
    emailCode = randomstring.generate(10);
    User.find({
      'verification.email.code': emailCode
    }, '-name', function(err, users) {
      if (users.length > 0) {
        generateCode();
      }
    })
  }
  generateCode();

  User.findById(req.user._id, function(err, user) {
    if (err) return done(err);

    if (!user) {
      return res.send(404)
    }
    user.verification.email.code = emailCode;
    user.save();
    var verifyUrl = process.env.DOMAIN + '/verify/email/' + emailCode;
    var notice = {
      to: req.body.email,
      from: 'IBM Beacon HQ <donotreply@heroes.ibmthinklab.com>',
      subject: 'IBM Beacon Email Verification',
      html: 'Welcome to IBM Beacon!<br><br>To verify your IBM email, please <a href=\"' + verifyUrl + '\">click here</a> or copy and paste this link into your browser: <br><br><a href=\"' + verifyUrl + '\">' + verifyUrl + '</a><br><br>We\'re excited to work with you!<br><br>Cheers,<br>The IBM Beacon Team'
    };

    mailgun.messages().send(notice, function(error, body) {
      if (error) {
        console.log(error)
      }
      return res.send(200)
    });
  })

};

// Send phone verification
exports.phone = function(req, res) {


  var smsCode = Math.floor(Math.random() * 1000000);
  var phone = req.body.country + req.body.number;
  User.findById(req.user._id, function(err, user) {
    if (err) return done(err);

    if (!user) {
      return res.send(404)
    }
    user.verification.phone.code = smsCode;
    user.verification.phone.number = phone;
    user.save();
    twilio.sendMessage({

      to: phone, // Any number Twilio can deliver to
      from: process.env.TWILIO_NUMBER, // A number you bought from Twilio and can use for outbound communication
      body: 'Your verification code is ' + smsCode // body of the SMS message

    }, function(err, responseData) {
      if (err) {
        console.log(err)
        return res.send(400, err)
      }
      return res.send(200)
    });

  })

}

// Verify sms
exports.verifyMobile = function(req, res) {
  User.findById(req.user._id, '-salt -hashedPassword', function(err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      return res.send(404)
    }
    console.log(user)
    console.log(req.params.id)
    console.log(user.verification.phone.code)
    if (user.verification.phone.code == req.params.code) {
      user.verification.phone.verified = true;
      if (user.verification.phone.verified && user.verification.email.verified) {
        user.role = 'user';
        delete user.verification;
      }
      user.save();
      delete user.verification.phone.code;
      delete user.verification.email.code;
      return res.send(200, user);
    } else {
      return res.send(404)
    }
  });

};

// Verify email
exports.verifyEmail = function(req, res) {
  User.findOne({
    'verification.email.code': req.params.code
  }, '-salt -hashedPassword', function(err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      return res.send(404)
    }
    user.verification.email.verified = true;
    if (user.verification.phone.verified && user.verification.email.verified) {
      user.role = 'user';
      delete user.verification;
    }
    user.save();
    return res.send(200);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
