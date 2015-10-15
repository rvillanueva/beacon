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
var User = require('./../user/user.model');
var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_SECRET,
  domain: process.env.MAILGUN_URL
});
var randomstring = require("randomstring");


// Send email verification
exports.email = function(req, res) {

  var emailCode;
  var email = req.body.email;
  var generateCode = function() {
    emailCode = randomstring.generate(16);
    User.find({
      'verification.email.code': emailCode
    }, '-name', function(err, users) {
      if (users.length > 0) {
        generateCode();
      }
      setCode();
    })
  }

  var setCode = function(){
    User.findById(req.user._id, function(err, user) {
      if (err) return done(err);

      if (!user) {
        return res.send(404)
      }
      user.verification.email.code = emailCode;
      user.verification.email.address = email;
      user.save();
      var verifyUrl = process.env.DOMAIN + '/verify/email/' + emailCode;
      var notice = {
        to: email,
        from: 'Beacon Notifier <donotreply@beacon.ibmthinklab.com>',
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
  }

  generateCode();

};

// Verify email
exports.verifyEmail = function(req, res) {
  var code = req.body.code;
  User.findOne({
    'verification.email.code': code
  }, '-salt -hashedPassword', function(err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      return res.send(404)
    }
    if(user.role == 'unverified'){
      user.role = 'user';
    }
    user.email = user.verification.email.address;
    delete user.verification;
    user.save();
    return res.send(200);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
