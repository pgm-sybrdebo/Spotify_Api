import knexSpotify from '../../db/knexSpotify.js';
import Logger from './Logger.js';

export default class users {
  constructor() {
    this.table = 'users';
  }

  /**
   * get 1 user with a specific username
   * @param {string} username
   * @returns id
   */
  async findOne(username) {
    try {
      return await knexSpotify(this.table).where({ username }).select('*').first();
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Get all users
   * @returns id
   */
  async get() {
    try {
      return await knexSpotify(this.table).select('*');
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Insert a new user to users table
   *
   * @param {object} user
   * @returns id
   */

  async add(userObject) {
    try {
      // add a user and get new id
      const id = knexSpotify(this.table).insert(userObject);
      return id;
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * updates an existing user (change for example your email)
   * @param {integer} id
   * @param {object} songObject
   * @returns id
   */
  async update(id, userObject) {
    try {
      return await knexSpotify(this.table).where('id', id).update(userObject);
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Deletes a specific user or all the users
   * @param {integer} id
   * @returns
   */
  async delete(id = null) {
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
