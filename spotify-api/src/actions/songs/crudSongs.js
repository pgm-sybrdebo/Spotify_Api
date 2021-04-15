/**
 * All the crud operation actions together
 */

import parseSong from './parseSong.js';
import { deleteObjectItemByValue } from '../../helpers/helpers.js';


/**
 * Getting songs
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const getSongs = async (song, request, response) => {
  try {
    response.status(200).json({ songs: await song.get() });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};


/**
 * Creates a new song
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const addSong = async (s, request, response) => {
  try {
    const { song } = request.body;
    let songObj = parseSong(song);
    const appendDate = Date.now();
    const lastUpdate = Date.now();
    songObj = { ...songObj, append_date: appendDate, last_update: lastUpdate };
    const newSong = await s.add(songObj);
    response.status(201).json({ song: newSong });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a song
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const updateSong = async (s, request, response) => {
  try {
    const { song } = request.body;
    const songObject = {
      title: 'title' in song ? song.title : 'not update',
      artist: 'artist' in song ? song.artist : 'not update',
      uri: 'uri' in song ? song.uri : 'not update',
    };
    let songObj = parseSong(songObject);
    songObj = deleteObjectItemByValue(songObj, 'not update');
    const lastUpdate = Date.now();
    songObj = { ...songObj, last_update: lastUpdate };
    const { id } = request.params;
    const updatedSong = await s.update(id, songObj);
    response.status(200).json({ song: updatedSong });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Delete a song
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const deleteSong = async (song, request, response) => {
  try {
    const { id } = request.params;
    await song.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
