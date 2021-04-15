// imports
import { body } from 'express-validator';

console.log(body);

/**
 * This function will split a string and return the last substring
 * @param {*} string
 * @param {*} divider
 * @param {*} amount
 * @returns
 */
export const splitter = (string, divider) => {
  const tokens = string.split(divider).slice();
  const result = tokens[tokens.length - 1];
  return result;
};

const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
export const removePunctuations = string => string.replace(regex, '');

/**
 * This function will delete the properties if the value of a property equals a specific value
 * @param {*} Obj
 * @param {*} val
 * @returns
 */
export const deleteObjectItemByValue = (Obj, val) => {
  for (const key in Obj) {
    if (Obj[key] == val) {
      delete Obj[key];
    }
  }
  return Obj;
};

/**
 * This  will check the registration request
 */
export const registrationRules = [
  body('user.last_name')
    .isLength({ min: 2 })
    .withMessage('Please fill in your last name'),
  body('user.first_name')
    .isLength({ min: 2 })
    .withMessage('Please fill in your first name'),
  body('user.username')
    .isLength({ min: 3 })
    .withMessage('Your username must consist of at least 3 characters'),
  body('user.email')
    .isEmail()
    .withMessage('Your email is not valid'),
  body('user.admin')
    .exists({ checkFalsy: true })
    .withMessage('Fill in whether you ara a member or an administrator'),
  body('user.password')
    .isLength({ min: 10 })
    .withMessage('Your password must consist of at least 10 characters'),
];
