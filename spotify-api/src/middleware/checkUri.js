// check if the spotify uri is correct

import { splitter, removePunctuations } from '../helpers/helpers.js';

export default (req, res, next) => {
  if (req.method == 'GET' || req.method == 'DELETE' || !req.originalUrl.includes('songs')) {
    next();
  } else if (req.body.song.uri) {
    const { uri } = req.body.song;
    const characters = splitter(uri, ':');
    const charactersClean = removePunctuations(characters);
    if (!uri.includes('spotify:track:')) {
      res.status(406).json({
        error: 'This is not a valid track uri!',
      });
    } else if (charactersClean.length !== 22) {
      res.status(406).json({
        error: 'This is not a valid track uri!',
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
