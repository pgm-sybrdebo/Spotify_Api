/**
 *  A Song parser to parse the incoming request
 *  Function that will give us 100% certainty that the data 
 *  coming from the client is a song item
 */

 export default (song) => {
   try {
    // validate if we have a song in the body
    if (song == null) {
      throw new Error('The Song Object was not set!');
    }

    // check if we have an append date in the request 
    if ('append_date' in song) {
      throw new Error('The Song Object can not contain an append date!');
    }

    // check if we have an update date in the request
    if ('last_update' in song) {
      throw new Error('The Song Object can not contain an update date!');
    }

    // check if we have a title
    if (song.title == null || song.title.length === 0) {
      throw new Error('The Song Object does not contain a title!');
    }

    // check if we have an artist
    if (song.artist == null || song.artist.length === 0) {
      throw new Error('The Song Object does not contain an artist!');
    }

     // check if we have an uri
     if (song.uri == null || song.uri.length === 0) {
      throw new Error('The Song Object does not contain an URI!');
    }

    // trim all the white/none characters in our string
    if (song.title != null) {
      song.title = song.title.trim();
    }

    if (song.artist != null) {
      song.artist = song.artist.trim();
    }

    // return the parsed song
     return song;
   } catch(e) {
    throw new Error(e.message);
   }
} 
