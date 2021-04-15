// imports

import Express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Users from '../../lib/Users.js';
import Logger from '../../lib/Logger.js';
import parseUser from '../users/parseUser.js';
import { validateRegistration } from '../../middleware/validateRegistration.js';
import { registrationRules } from '../../helpers/helpers.js';

// init dotenv
dotenv.config();

// init router
const app = Express.Router();

// init user database
const userData = new Users();

// configuration of passport.js with local strategy
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      Logger.info(username);
      try {
        // get user by username from database
        const user = await userData.findOne(username);

        // check if user exists
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        // check if password is correct
        if (!(await isValidPassword(user, password))) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    },
  ),
);

app.post('/login', (req, res) => {
  // do authentication
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      res.status(401).json(info);
    } else if (!user) {
      res.status(401).json(info);
    } else {
      // jwt token
      const jwtObject = {
        id: user.id,
        username: user.username,
        email: user.email,
        admin: user.admin,
      };
      const token = jwt.sign(jwtObject, process.env.JWT_UNIQUE_KEY, {
        expiresIn: parseInt(process.env.JWT_LIFETIME),
      });
      res.status(200).json({
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          admin: user.admin,
        },
      });
    }
  })(req, res);
});

app.post('/register', registrationRules, validateRegistration, (request, response) => {
  const { user } = request.body;
  const userObj = parseUser(user);
  const appendDate = Date.now();
  const lastUpdate = Date.now();
  bcrypt.hash(request.body.user.password, parseInt(process.env.BCRYPT_SALT_ROUNDS)).then((hash) => {
    userObj.password = hash;
    userData.add({ ...userObj, append_date: appendDate, last_update: lastUpdate });
    response.status(200).send(hash);
  });
});


export default app;


const isValidPassword = async (user, password) => {
  const match = await bcrypt.compare(password, user.password);
  return match;
};
