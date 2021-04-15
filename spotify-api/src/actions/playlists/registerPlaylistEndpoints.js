/**
 * Register the endpoints
 */

 import {
  getPlaylists,
  addPlaylist,
  updatePlaylist,
  deletePlaylist
} from './crudPlaylists.js';

import Express from 'express';
import Playlists from '../../lib/Playlists.js';

const app = Express.Router();

const playlistDb = new Playlists();

// get playlists
app.get('/', async (req, res) => {
  await getPlaylists(playlistDb, req, res);
});

// add a playlist
app.post('/', async (req, res) => {
  await addPlaylist(playlistDb, req, res);
});

// update a playlist
app.put('/:id', async (req, res) => {
  await updatePlaylist(playlistDb, req, res);
});

// delete a playlist
app.delete('/:id', async (req, res) => {
  await deletePlaylist(playlistDb, req, res);
});


export default app;
