# Final project Programming_3: A Spotify Api

Final Project Programming_3 2020-21 | Associate Degree in Computer Programming | Artevelde University of Applied Sciences

Project: Create an API to manage songs and playlists. With the API you can add songs as an administrator, each member can then create and manage playlists.

|           |                                |
| --------- | ------------------------------ |
| Firstname | Sybren                         |
| Lastname  | De Boever                      |
| Gender    | :male_sign:                    |
| Email     | sybrendeboever3344@hotmail.com |

## Introduction

With this API you can add songs and playlists to a database.
As a user you need first to register yourself and if you are registered then you can log in with your users credentials.
When you are logged in, you can create, manage and delete playlists with hundreds of songs.
If you have administrator rights, you can also create, manage and delete songs.

## table of contents

1. [QuickStart](#Quickstart)
2. [Database](#database)
3. [Endpoints](#endpoints)

## Quickstart
Before you can use all the endpoints, you have to install some node modules. 
You can also seed the entire database with fake data.
After this you start up the server

- use `npm install` to install all the necessary node modules.
- use `npm run seed` to fill the entire database with random fake data.
- use `npm run dev` to start the server

## Database
The spotify api uses a sqlite database created in DB Browser (SQLite). To use this, some node modules are required.
[knex.js](http://knexjs.org/#Builder-update) and [sqlite3](https://www.npmjs.com/package/sqlite3) are responsible for the connection between the app and the database. With knex you can write sql queries without actually writing sql queries. 

### Seed the database
To provide the database with random data, [faker](https://www.npmjs.com/package/faker) and the [spotify api](https://developer.spotify.com/documentation/web-api/quick-start/) were used.
The users are completely created with faker. There is also a 15% chance that a user has administration rights. For the playlists, a user_id entered by you is used to store the playlists of this user in the database. It is also possible to save fewer playlists than the user has. The songs table is created by adding all songs from the used playlists.


## Endpoints
### Authentication

We use the following node modules for authentication:
- [passport](https://www.npmjs.com/package/passport)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [passport-jwt](https://www.npmjs.com/package/passport-jwt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [express-validator](https://www.npmjs.com/package/express-validator)

To register a new user, make a POST request: `/auth/register`

The POST `/auth/register` endpoint requires the following object in the body:
```
{
    "user": 
    {
        "last_name": "lastName",
        "first_name": "firstName",
        "username": "username123",
        "email": "email@email.com",
        "admin": "true",
        "password": "difficult password"
    }
}
```
If you have administrator rights then admin must be true but if you are only a user then you must specify it as false.
This registration also has a validation with express validator. This checks whether all the values you entered are correct. For example, it checks whether your first name, last name, and username are long enough to be a name. Besides, it also checks whether the admin field is empty or not. Finally, it checks whether it is a valid email address and whether your password is longer than 10 characters.

A successful registration will add this user to the database and return your encrypted password.

```
$2b$10$eTDbzoYKBnexDs.PSRcszOyxt.Nvn7p6ek7w4XOvxX85bc8.Xc3NS
```

To login as a registered user, you make a POST request: `/auth/login`

The POST `/auth/login` endpoint requires the following object in the body:

```
{
    "username": "testing123",
    "password": "tester123456"
}
```

A successful login will return a status 200 and a json object containing  a jwt token and the necessary user information.

```
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAyLCJ1c2VybmFtZSI6InRlc3RpbmcxMjMiLCJlbWFpbCI6InNkZmZAc2RzZGZzZnNkZi5jb20iLCJhZG1pbiI6InRydWUiLCJpYXQiOjE2MTgzMTA2MzksImV4cCI6MTYxODMxNDIzOX0.ZFxDGkioaH7nz52EbS26zsxUm6Qknwla2fDaWj5P7MY",
    "user": {
        "id": 102,
        "username": "username123",
        "email": "email@email.com",
        "admin": "true"
    }
}
```
### get every user
To get every registered user, you make a GET request: `/users`

The GET `/users` endpoint requires only your JWT token in the header.


A successful GET request will return a status 200 and a json object containing all the information of the users.

```
{
    "users": [
        {
            "id": 1,
            "last_name": "Little",
            "first_name": "Alfred",
            "username": "Adrianna_Hilll",
            "email": "Pat.Quitzon92@yahoo.com",
            "admin": "0",
            "password": "harum",
            "append_date": 1579317983000,
            "last_update": 1573910047000
        },
        {
            "id": 2,
            "last_name": "Pouros",
            "first_name": "Joe",
            "username": "Talia_Corwin",
            "email": "Violet17@hotmail.com",
            "admin": "0",
            "password": "consequuntur",
            "append_date": 1587821853000,
            "last_update": 1606564996000
        },
```
### update a user 
To update a registered user, you make a PUT request: `/users/:id`

The PUT `/users/:id` endpoint requires your JWT token in the header and the data that you want to change in a json object. The fields 'append_date' and 'last_update' can not be updated by you. 

```
{
    "user": 
    {
        "last_name": "lastName2"
        "email": "Violet17@hotmail.com"
    }
}
```


A successful PUT request will return a status 200 and a json object containing:

```
{
    "user": 1
}
```

### delete a user

To delete a registered user, you make a DELETE request: `/users/:id`

The DELETE `/users/:id` endpoint requires only your JWT token in the header.

A successful DELETE request will return a status 204.

### get playlists

To get every playlist, you make a GET request: `/playlists`

The GET `/playlists` endpoint requires only your JWT token in the header.


A successful GET request will return a status 200 and a json object containing all the information of the playlists.

```
{
    "playlists": [
        {
            "id": 1,
            "title": "dance",
            "user_id": 71,
            "songs": "74,83,58,72,11,66,4,59,22,71,63,18",
            "append_date": 1558977714000,
            "last_update": 1576366362000
        },
        {
            "id": 2,
            "title": "Dance Party",
            "user_id": 85,
            "songs": "101,102,104,103,105",
            "append_date": 1565894202000,
            "last_update": 1616655734000
        },
```

### add a new playlist

To add a new playlist, you make a POST request: `/playlists`

The POST `/playlists` endpoint requires your jwt token and the following object in the body:
```
{
    "playlist": 
    {
        "title": "pgm-3",
        "user_id": 8,
        "songs": "[1,2,3,4]"
    }
}
```

A successful registration will add this playlist to the database and return a status 201 and the following json object:

```
{
    "playlist": [
        11
    ]
}
```

### update a playlist 
To update a playlist, you make a PUT request: `/playlists/:id`

The PUT `/playlists/:id` endpoint requires your JWT token in the header and the data that you want to change in a json object. The fields 'user_id', 'append_date' and 'last_update' can not be updated by you. 

```
{
    "playlist": 
    {
        "title": "pgm-4",
        "songs": "[1,2]"
    }
}
```

A successful PUT request will return a status 200 and a json object containing:

```
{
    "playlist": 1
}
```

### delete a playlist

To delete a playlist, you make a DELETE request: `/playlists/:id`

The DELETE `/playlists/:id` endpoint requires only your JWT token in the header.

A successful DELETE request will return a status 204.

### get songs

To get every song, you make a GET request: `/songs`
Only users with administrator rights can use this.

The GET `/songs` endpoint requires only your JWT token in the header and you need to have administrator rights.


A successful GET request will return a status 200 and a json object containing all the information of the songs.

```
{
    "songs": [
        {
            "id": 1,
            "title": "Kids (feat. MKLA)",
            "artist": "KSHMR",
            "uri": "spotify:track:3rgTS3933lMWoPiN6CW4qY",
            "append_date": 1597363200000,
            "last_update": 1597363200000
        },
        {
            "id": 2,
            "title": "All We Got (feat. KIDDO) - Ofenbach Remix",
            "artist": "Robin Schulz",
            "uri": "spotify:track:2rUsJXt4NeeDiIU6sBvrxo",
            "append_date": 1605225600000,
            "last_update": 1605225600000
        },
```

### add a new song

To add a new song, you make a POST request: `/songs`
Only users with administrator rights can use this.

The POST `/playlists` endpoint requires your jwt token and the following object in the body:
```
{
    "song": 
    {
        "title": "tesfsdft",
        "artist": "tester",
        "uri": "spotify:track:343456798ae34581891263"
    }
}
```
There is also a validation on the uri. The uri needs to consist of 'spotify:track' followed by 22 characters.

A successful registration will add this song to the database and return a status 201 and the following json object:

```
{
    "song": [
        729
    ]
}
```

### update a song
To update a song, you make a PUT request: `/songs/:id`
Only users with administrator rights can use this.

The PUT `/songs/:id` endpoint requires your JWT token in the header and the data that you want to change in a json object. The fields 'append_date' and 'last_update' can not be updated by you. 

```
{
    "song": 
    {
        "title": "pgm-3",
        "uri": "spotify:track:123456789azertyuiopmlk"
    }
}
```

A successful PUT request will return a status 200 and a json object containing:

```
{
    "song": 1
}
```

### delete a playlist

To delete a playlist, you make a DELETE request: `/songs/:id`

The DELETE `/songs/:id` endpoint requires only your JWT token in the header.

A successful DELETE request will return a status 204.
