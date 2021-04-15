import knex from 'knex';

// database configuration
const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: './db/spotify.sqlite3'
  },
  useNullAsDefault: true
};

// initiate the knex library with the config
const knexSpotify = knex(dbConfig);
export default knexSpotify;