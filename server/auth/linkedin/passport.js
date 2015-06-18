var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

exports.setup = function (User, config) {
  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: "/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
  }, function(accessToken, refreshToken, profile, done) {
    User.findOne({
      'linkedin.id': profile.id
    }, function(err, user) {
      if (err) return done(err);

      if (!user) {
        var newUser = new User({
          name: profile.displayName,
          role: 'user',
          provider: 'linkedin',
          linkedin: profile._json,
          title: profile._json.headline,
          traits:{
            industry: {},
            service:{},
            hours: 0
          }
        });
        newUser.save(function(err, user) {
          //if (err) return validationError(user, err);
          //var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
          //res.json({ token: token });
          if (err) return done(err);
          return done(err, user);
        });
      } else {
        return done(null, user);
      }
    });
  }));
};
