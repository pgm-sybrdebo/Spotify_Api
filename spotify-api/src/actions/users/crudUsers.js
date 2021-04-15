/**
 * All the crud operation actions together
 */

import parseUser from './parseUser.js';
import { deleteObjectItemByValue } from '../../helpers/helpers.js';

/**
 * Getting users
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const getUsers = async (user, request, response) => {
  try {
    response.status(200).json({ users: await user.get() });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};

/**
 * Creates a new user
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const addUser = async (u, request, response) => {
  try {
    const { user } = request.body;
    let userObj = parseUser(user);
    const appendDate = Date.now();
    const lastUpdate = Date.now();
    userObj = { ...userObj, append_date: appendDate, last_update: lastUpdate };
    const newUser = await u.add(userObj);
    response.status(201).json({ user: newUser });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a user
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const updateUser = async (u, request, response) => {
  try {
    const { user } = request.body;
    const userObject = {
      last_name: 'last_name' in user ? user.last_name : 'not update',
      first_name: 'first_name' in user ? user.first_name : 'not update',
      username: 'username' in user ? user.username : 'not update',
      email: 'email' in user ? user.email : 'not update',
      admin: 'admin' in user ? user.admin : 'not update',
      password: 'password' in user ? user.password : 'not update',
    };
    let userObj = parseUser(userObject);
    userObj = deleteObjectItemByValue(userObj, 'not update');
    const lastUpdate = Date.now();
    userObj = { ...userObj, last_update: lastUpdate };
    const { id } = request.params;
    const updatedUser = await u.update(id, userObj);
    response.status(200).json({ user: updatedUser });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Delete a user
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const deleteUser = async (user, request, response) => {
  try {
    const { id } = request.params;
    await user.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
