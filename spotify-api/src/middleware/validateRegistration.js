import { validationResult } from 'express-validator';
import Logger from '../lib/Logger.js';

export const validateRegistration = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    Logger.json({ errors: err.array() });
    return res.status(400).json({ errors: err.array() });
  }
  next();
};
