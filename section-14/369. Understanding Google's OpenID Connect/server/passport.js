import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const client_id = ''
const clientSecret = ``
const redirectUrl = ''


passport.use(
    new GoogleStrategy(
    {
    clientID: client_id,
    clientSecret,
    callbackURL: redirectUrl
    },
   function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile)
  }
));