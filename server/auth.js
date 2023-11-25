// file created for google Oauth
const passport = require('passport');     // importing google oauth 2 library
require('dotenv').config()

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3500/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    const userEmail = profile.emails[0].value; // Assuming the first email in the array

      // Check if the email domain matches the allowed domain
      if (!userEmail.endsWith('@vitbhopal.ac.in')) {
        return done(null, false, { message: 'Only @example.com emails are allowed' });
      }

      // Your logic to handle user authentication and registration goes here
      // Example: Search user by email in your database, create a new user, etc.

      // If everything is fine, return the user
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    done(null, user);
});
