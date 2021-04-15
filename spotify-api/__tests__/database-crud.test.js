import Songs from '../src/lib/Songs.js';

const songsdb = new Songs();

describe('Tests to a sqlite3 database', () => {

  it('should return an array with at least one song', async () => {
    const songs = await songsdb.get();
    expect(Array.isArray(songs)).toBe(true);
    expect(songs.length).toBeGreaterThan(0);
  });
});