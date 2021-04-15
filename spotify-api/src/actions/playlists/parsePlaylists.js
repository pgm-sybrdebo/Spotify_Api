/**
 *  A playlist parser to parse the incoming request
 *  Function that will give us 100% certainty that the data 
 *  coming from the client is a playlist item
 */

 export default (playlist) => {
  try {
   // validate if we have a playlist in the body
   if (playlist == null) {
     throw new Error('The Playlist Object was not set!');
   }

  // check if we have an update date in the request
  if ('last_update' in playlist) {
    throw new Error('The Playlist Object can not contain an update date!');
  }

  // check if we have an append date in the request
  if ('append_date' in playlist) {
    throw new Error('The Playlist Object can not contain an append date!');
  }

   // check if we have a title
   if (playlist.title == null || playlist.title.length === 0) {
     throw new Error('The Playlist Object does not contain a title!');
   }


   // trim all the white/none characters in our string
   if (playlist.title != null) {
     playlist.title = playlist.title.trim();
   }

   // return the parsed song
   return playlist;
  } catch(e) {
   throw new Error(e.message);
  }
} 
