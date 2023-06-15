import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import keys from '..//config/keys';


const User = mongoose.model('User');
const GoogleStrategy = Strategy;

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use('google',
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        console.log("existingUser: ", existingUser);
        if (existingUser) {
          console.log("existingUser: ", existingUser);
          return done(null, existingUser);
        }
        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName
        }).save();
        console.log("user: ", user);
        done(null, user);
      } catch (err) {
        console.log("err: ", err);
        done(err, null);
      }
    }
  )
);
