/**
 * All the crud operation actions together
 */

import parsePlaylist from './parsePlaylists.js';
import { deleteObjectItemByValue } from '../../helpers/helpers.js';


/**
 * Getting playlists
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const getPlaylists = async (playlist, request, response) => {
  try {
    response.status(200).json({ playlists: await playlist.get() });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};


/**
 * Creates a new playlist
 *
 * @param {*} todo
 * @param {*} request
 * @param {*} response
 */
export const addPlaylist = async (p, request, response) => {
  try {
    const { playlist } = request.body;
    let playlistObj = parsePlaylist(playlist);
    const appendDate = Date.now();
    const lastUpdate = Date.now();
    playlistObj = { ...playlistObj, append_date: appendDate, last_update: lastUpdate };
    const newPlaylist = await p.add(playlistObj);
    response.status(201).json({ playlist: newPlaylist });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a playlist
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const updatePlaylist = async (p, request, response) => {
  try {
    const { playlist } = request.body;
    const playlistObject = {
      title: 'title' in playlist ? playlist.title : 'not update',
      user_id: 'not update',
      songs: 'songs' in playlist ? playlist.songs : 'not update',
    };
    let playlistObj = parsePlaylist(playlistObject);
    playlistObj = deleteObjectItemByValue(playlistObj, 'not update');
    const lastUpdate = Date.now();
    playlistObj = { ...playlistObj, last_update: lastUpdate };
    const { id } = request.params;
    const updatedPlaylist = await p.update(id, playlistObj);
    response.status(200).json({ playlist: updatedPlaylist });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Delete a playlist
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const deletePlaylist = async (playlist, request, response) => {
  try {
    const { id } = request.params;
    await playlist.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
