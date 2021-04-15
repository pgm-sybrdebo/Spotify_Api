/**
 * Our main application
 */

import Express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Logger from './lib/Logger.js';

import registerSongEndpoints from './actions/songs/registerSongEndpoints.js';
import registerPlaylistEndpoints from './actions/playlists/registerPlaylistEndpoints.js';
import registerUserEndpoints from './actions/users/registerUserEndpoints.js';
import authenticeEndpoints from './actions/auth/index.js';

import customMiddleware from './middleware/index.js';

// init dotenv
dotenv.config();

// create a new express application
const app = Express();

// node env
const { NODE_ENV } = process.env;

// add json body parser
app.use(bodyParser.json());

// add middleware and register the endpoints
app.use('/songs', ...customMiddleware, registerSongEndpoints);
app.use('/playlists', ...customMiddleware, registerPlaylistEndpoints);
app.use('/users', ...customMiddleware, registerUserEndpoints);

// register the endpoints
// registerSongEndpoints(app);
// registerPlaylistEndpoints(app);
// registerUserEndpoints(app);

app.use('/auth', authenticeEndpoints);


if (NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    Logger.info(`Server is listening to port ${process.env.PORT}`);
  });

  Logger.info('Starting the server ...');
}


export { app };
