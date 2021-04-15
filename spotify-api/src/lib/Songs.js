import knexSpotify from '../../db/knexSpotify.js';
import Logger from './Logger.js';

export default class Songs {
  constructor() {
    this.table ='songs';
  }


  /**
   * Get all songs from the database table songs
   * @param {*} id 
   * @returns 
   */
  async get() {
    try {
      return await knexSpotify(this.table).select('*');
      // if (!id) {
      //   return await knexSpotify(this.table).select('*');
      // }

      // const [song] = await knexSpotify(this.table).where('id', parseInt(id));
      // return song;

    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Insert a new song to songs table
   * 
   * @param {object} songObject
   */

  async add(songObject) {
    try {
      return await knexSpotify(this.table).insert(songObject);
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * updates an existing song
   * @param {integer} id 
   * @param {object} songObject 
   * @returns id
   */
  async update(id, songObject) {
    try {
      return await knexSpotify(this.table).where('id', id).update( songObject);
    } catch (e) {
      Logger.error(e.message);
    }
  }


  /**
   * Deletes a specific song
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
