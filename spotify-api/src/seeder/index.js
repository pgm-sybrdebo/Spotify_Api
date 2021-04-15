// imports

import faker from 'faker';
import _ from 'underscore';
import { fetchPlaylists, fetchSongs } from './fetch.js';

// models (crud communicate with database)
import Users from '../lib/Users.js';
import Playlists from '../lib/Playlists.js';
import Songs from '../lib/Songs.js';

// global constants
const usersAmount = 100;
// Max 50 playlists due to Spotify api limit
const playlistsAmount = 10;
const usersDB = new Users();
const playlistsDB = new Playlists();
const songsDB = new Songs();

/**
 *  This will truncate the database
 */
const truncate = async () => {
  const deleteSongs = await songsDB.delete();
  const deletePlaylists = await playlistsDB.delete();
  const userDelete = await usersDB.delete();
  console.log('deleted all records and reset the sequence');
};

/**
 * Creates random users
 * @param {number} amount
 * @returns array of users
 */
const createUsers = (amount) => {
  const users = [];
  for (let i = 0; i < amount; i++) {
    // 15% chance for admin user
    const boolean = Math.random() < 0.15;
    const user = {
      last_name: faker.name.lastName(),
      first_name: faker.name.firstName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      admin: boolean,
      password: faker.lorem.word(),
      append_date: Date.parse(faker.date.past(2)),
      last_update: Date.parse(faker.date.past(2)),
    };
    users.push(user);
  }
  return users;
};

/**
 * seed the created users
 * @param {array of users} users
 * @returns ids
 */
const seedUsers = (users) => {
  const ids = users.map(async (user) => {
    const id = await usersDB.add(user);
    return id;
  });

  return Promise.all(ids);
};

/**
 * Creates random playlists with 10 songs
 * @param {number} amount
 * @param {array} userIds
 * @returns array of playlists
 */
const createPlaylists = async (amount, userIds) => {
  const playlists = [];
  const playlistsData = await fetchPlaylists(amount);
  const playlistsTotal = playlistsData.total;

  for (let i = 0; i < (amount < playlistsTotal ? amount : playlistsTotal); i++) {
    const playlistNumber = playlistsData.items[i].id;
    const songs = await createSongs(playlistNumber, userIds);
    console.log(`Created ${songs.length} songs`);
    const songsIds = await seedSongs(songs);
    console.log('songs added to database');
    const playlist = {
      title: playlistsData.items[i].name,
      user_id: _.sample(userIds),
      songs: _.sample(songsIds, faker.random.number({
        min: 1,
        max: 20,
      })),
      append_date: Date.parse(faker.date.past(2)),
      last_update: Date.parse(faker.date.past(2)),
    };
    playlists.push(playlist);
  }
  return playlists;
};

/**
 * seed the created playlists
 * @param {array of playlists} playlists
 * @returns ids
 */
const seedPlaylists = (playlists) => {
  const ids = playlists.map(async (playlist) => {
    const id = await playlistsDB.add(playlist);
    return id;
  });

  return Promise.all(ids);
};

/**
 * creates all the songs from an existing playlist
 * @param {number} playlistNumber
 * @returns array of users
 */
const createSongs = async (playlistNumber) => {
  const songs = [];
  const songsData = await fetchSongs(playlistNumber);
  const existingSongs = await songsDB.get();
  const songsUris = existingSongs.map(song => song.uri);

  songsData.items.forEach((songData) => {
    if (songsUris.indexOf(songData.track.uri) === -1) {
      const song = {
        title: songData.track.name,
        artist: songData.track.album.artists[0].name,
        uri: songData.track.uri,
        append_date: Date.parse(songData.track.album.release_date),
        last_update: Date.parse(songData.track.album.release_date),
      };
      songs.push(song);
    }
  });
  return songs;
};

/**
 * seed the created songs
 * @param {array} songs
 * @returns ids
 */
const seedSongs = (songs) => {
  const ids = songs.map(async (song) => {
    const id = await songsDB.add(song);
    return id;
  });

  return Promise.all(ids);
};

/**
 * seed users, playlists and songs
 */
const seed = async () => {
  // Create and seed users
  const users = createUsers(usersAmount);
  console.log(`Created ${users.length} users`);
  const usersIds = await seedUsers(users);
  console.log('users added to database');

  // Create and seed playlists
  const playlists = await createPlaylists(playlistsAmount, usersIds);
  console.log(`Created ${playlists.length} playlists`);
  const playlistIds = await seedPlaylists(playlists);
  console.log('playlists added to database');
};

/**
 * this will truncate and seed the database
 */
const seeden = async () => {
  await truncate();
  await seed();
  process.exit();
};

seeden();
