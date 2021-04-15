import request from 'supertest';
import { app } from '../src/app.js';


describe('test our endpoints with HTTP-requests', () => {
  let token;
  let playlistId;
  let songId;
  let userId;
  it('should return an access token', async (done) => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username:'testing123',
        password: 'tester123456'
      })
      .set('Accept', 'application/json');
    
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
    console.log(response.body);
    console.log(response.body.token);
    token = response.body.token;
    done();
  });


  // playlists 

  it('should return a list of playlists', async (done) => {
    const response = await request(app)
      .get('/playlists')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)

    expect(response.statusCode).toEqual(200); 
    expect(response.body).toHaveProperty('playlists');

    done();
  });


  it('should return a new playlist', async (done) => {
    const response = await request(app)
      .post('/playlists')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        "playlist": 
          {
              "title": "playlist pgm",
              "user_id": 8,
              "songs": "[1,2,3,4]"
          }
      })

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('playlist');
    playlistId = response.body.playlist;
    expect(response.body.playlist).toEqual(playlistId);

    done();
  });


  it('should update a playlist', async (done) => {
    const response = await request(app)
      .put(`/playlists/${playlistId[0]}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        "playlist": 
          {
            "title": "playlist pgm-4",
            "songs": "[1,2,4]"
          }
    })

    expect(response.statusCode).toEqual(200); 
    done();
  });

  it('should delete a playlist', async (done) => {
    const response = await request(app)
      .delete(`/playlists/${playlistId[0]}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)

    expect(response.statusCode).toEqual(204); 

    done();
  });

  // songs: make sure you have an user with admin rights 

  it('should return a list of songs', async (done) => {
    const response = await request(app)
      .get('/songs')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)

    expect(response.statusCode).toEqual(200); 
    expect(response.body).toHaveProperty('songs');

    done();
  });


  it('should return a new song', async (done) => {
    const response = await request(app)
      .post('/songs')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        "song": 
          {
            "title": "javascript extreme",
            "artist": "Frederick Rogiers",
            "uri": "spotify:track:3434567rtae34581891263"
          }
      })

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('song');
    songId = response.body.song;
    expect(response.body.song).toEqual(songId);

    done();
  });


  it('should update a song', async (done) => {
    const response = await request(app)
      .put(`/songs/${songId[0]}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        "song": 
          {
            "title": "jest",
            "uri": "spotify:track:azertyuiop123456789fbg"
          }
    })

    expect(response.statusCode).toEqual(200); 
    done();
  });

  it('should delete a song', async (done) => {
    const response = await request(app)
      .delete(`/songs/${songId[0]}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)

    expect(response.statusCode).toEqual(204); 

    done();
  });
});