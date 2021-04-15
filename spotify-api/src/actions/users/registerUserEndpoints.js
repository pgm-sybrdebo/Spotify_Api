/**
 * Register the endpoints
 */

import Express from 'express';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from './crudUsers.js';

import Users from '../../lib/Users.js';

const app = Express.Router();

const userDb = new Users();


// get users
app.get('/', async (req, res) => {
  await getUsers(userDb, req, res);
});

// update a user
app.put('/:id', async (req, res) => {
  await updateUser(userDb, req, res);
});

// delete a user
app.delete('/:id', async (req, res) => {
  await deleteUser(userDb, req, res);
});

export default app;
