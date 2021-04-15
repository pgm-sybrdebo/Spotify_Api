/**
 *  A User parser to parse the incoming request
 *  Function that will give us 100% certainty that the data
 *  coming from the client is a user item
 */

export default (user) => {
  try {
    // validate if we have a user in the body
    if (user == null) {
      throw new Error('The User Object was not set!');
    }

    // check if we have an append date in the request
    if ('append_date' in user) {
      throw new Error('The User Object can not contain an append date!');
    }

    // check if we have an update date in the request
    if ('last_update' in user) {
      throw new Error('The User Object can not contain an update date!');
    }

    // check if we have a last name
    if (user.last_name == null || user.last_name.length === 0) {
      throw new Error('The User Object does not contain a last name!');
    }

    // check if we have a first name
    if (user.first_name == null || user.first_name.length === 0) {
      throw new Error('The User Object does not contain an artist!');
    }

    // check if we have an email
    if (user.email == null || user.email.length === 0) {
      throw new Error('The User Object does not contain an email!');
    }

    // Check if email is correct
    if (user.email & !user.email.includes('@')) {
      throw new Error('The User Object does not contain a valid email!');
    }

    // check if we have a password
    if (user.password == null || user.password.length === 0) {
      throw new Error('The User Object does not contain a password!');
    }

    // trim all the white/none characters in our string
    if (user.last_name != null) {
      user.last_name = user.last_name.trim();
    }

    if (user.first_name != null) {
      user.first_name = user.first_name.trim();
    }

    if (user.username != null) {
      user.username = user.username.trim();
    }

    if (user.email != null) {
      user.email = user.email.trim();
    }

    // return the parsed user
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};
