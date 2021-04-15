// import

import fetch from 'node-fetch';
import * as seed from './index.js';

// constants

const user_id = 'sybrendeboever3344';
const SPOTIFY_API = 'https://api.spotify.com/v1/';
/**
 * Ask for token here: https://developer.spotify.com/console/get-playlists/
 * token is only valid for 1 hour
 */
const token = 'BQBvMiCwzzquhXmzB1ooDR1e65ODScjWlnU-op3NYjHNXgvYyIgf4oeWAiVg7wJIcEzR_HJE6GF2Q0QfLdpQ5B0PDUDjPesNLs6SxUU_MBZKEwnLKuT4ySUQHUKoOIE1rul1IESy-ULspsgniXhsA8ccW4LcKerPjkg';

/**
 * This module will fetch playlists from the spotify api
 */

export const fetchPlaylists = async (amount) => {
  try {
    const url = new URL(`${SPOTIFY_API}users/${user_id}/playlists`);
    url.searchParams.set('limit', amount);
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};


/**
 * This module will fetch songs from the spotify api
 */
export const fetchSongs = async (playlistNumber) => {
  try {
    const url = new URL(`${SPOTIFY_API}playlists/${playlistNumber}/tracks`);
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
