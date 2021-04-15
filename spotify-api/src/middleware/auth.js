// imports
import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
import Logger from '../lib/Logger.js';

// init dotenv
dotenv.config();

// initialise passport
const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

// define options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_UNIQUE_KEY,
};

//  passport jwt configuration
passport.use(
  new JwtStrategy(jwtOptions, async (jwtData, done) => {
    try {
      Logger.info(`${jwtData.username} does an authenticated request`);
      return done(null, jwtData.admin);
    } catch (error) {
      done(null, error);
    }
  }),
);

export default (req, res, next) => {
  if (req.originalUrl.includes('users') || req.originalUrl.includes('playlists')) {
    // authenticate user
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      if (error || !user) {
        Logger.error(info);
        res.status(401).json({
          error: 'The user has no permissions to call spotify',
        });
      } else {
        next();
      }
    })(req, res, next);
  } else if (req.originalUrl.includes('songs')) {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      if (error || !user || user == 'false') {
        Logger.error(info);
        res.status(401).json({
          error: 'The user has no permissions to call spotify api',
        });
      } else {
        next();
      }
    })(req, res, next);
  }
};
