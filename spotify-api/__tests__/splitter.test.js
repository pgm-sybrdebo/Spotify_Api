import { splitter } from '../src/helpers/helpers.js';

it('should split a string and return the last substring', () => {
  expect(splitter('using jest for the second time', ' ')).toBe('time');
  expect(splitter('spotify:track:31561a156', ':')).toBe('31561a156');
  // expect(splitter('spotify:track:3156156156', ':')).toBe('track'); false -> ok
});