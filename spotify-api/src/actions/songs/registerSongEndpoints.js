/**
 * Register the endpoints
 */

import {
  getSongs,
  addSong,
  updateSong,
  deleteSong
} from './crudSongs.js';

import Express from 'express';
import Songs from '../../lib/Songs.js';

const app = Express.Router();

const songDb = new Songs();

// get songs
app.get('/', async (req, res) => {
  await getSongs(songDb, req, res);
});

// add a song
app.post('/', async (req, res) => {
  await addSong(songDb, req, res);
});

// update a song
app.put('/:id', async (req, res) => {
  await updateSong(songDb, req, res);
});

// delete a song
app.delete('/:id', async (req, res) => {
  await deleteSong(songDb, req, res);
});

export default app;
