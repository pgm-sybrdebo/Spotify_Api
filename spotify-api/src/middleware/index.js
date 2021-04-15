import authMiddleware from './auth.js';
import checkUriMiddleware from './checkUri.js';

export default [
  authMiddleware,
  checkUriMiddleware,
];
