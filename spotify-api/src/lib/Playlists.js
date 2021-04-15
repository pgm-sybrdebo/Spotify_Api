import knexSpotify from '../../db/knexSpotify.js';
import Logger from './Logger.js';

export default class playlists {
  constructor() {
    this.table = 'playlists';
  }

  /**
   * Get all playlists from the database table playlists
   */
  async get() {
    try {
      return await knexSpotify(this.table).select('*');
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Insert a new field to playlists table
   *
   * @param {object} playlistObject
   * @returns id
   */

  async add(playlistObject) {
    try {
      // add field and get new id
      return await knexSpotify(this.table).insert(playlistObject);
    } catch (e) {
      Logger.error(e.message);
    }
  }


  /**
   * updates an existing playlist
   * @param {*} id
   * @param {*} playlistObject
   * @returns id
   */
  async update(id, playlistObject) {
    try {
      return await knexSpotify(this.table).where('id', id).update(playlistObject);
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Deletes a specific playlist or all the playlists
   * @param {integer} id
   * @returns
   */
  async delete(id) {
    try {
      // delete all fields and reset sequence
      if (!id) {
        const id = await knexSpotify(this.table).del();
        return await knexSpotify('sqlite_sequence').where('name', this.table).del();
      }
      return await knexSpotify(this.table).where('id', id).del();
    } catch (e) {
      Logger.error(e.message);
    }
  }
}
