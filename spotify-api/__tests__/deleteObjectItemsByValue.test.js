import { deleteObjectItemByValue } from '../src/helpers/helpers.js';

it('should delete the property if the value of a property equals a specific value', () => {
  const obj = {
    first_name: 'Sybren',
    last_name: 'De Boever',
    email: 'test',
  };
  const newObj = {
    first_name: 'Sybren',
    last_name: 'De Boever',
  };
  expect(deleteObjectItemByValue(obj, 'test')).toStrictEqual(newObj);
});
