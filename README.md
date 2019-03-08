# :dancer::musical_note: EDM Producers API

An RESTful API built with [Express.js](https://expressjs.com/) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

Other packages:

[Mongoose](https://mongoosejs.com/)

[Mongoose Timestamps Plugin](https://www.npmjs.com/package/mongoose-timestamp)

[JSON Web Tokens](https://jwt.io/)

[bcrypt.js](https://www.npmjs.com/package/bcryptjs)

[body-parser](https://www.npmjs.com/package/body-parser)

## Setup

1. Install [Node.js](https://nodejs.org/en/)

2. Clone Repo or download as [zip](https://github.com/ahmedkrmn/CRUD-Authentication-RESTful-API/archive/master.zip).

3. `cd` into the project directory and Install required packages

   ```bash
   npm install
   ```

4. Edit the `config.js` file in the root directory to change the port number, JWT Secret and add your MongoDB Atlas URI.

5. Run the server

   ```bash
   npm run start
   ```

## Features

- View all producers in the database
- View specific producers
- Add/Edit/Delete a producer
- Create a user account to modify the database

## Routes List

### Producers

| Method   | URI                        | Action                                                                                                 |
| -------- | -------------------------- | ------------------------------------------------------------------------------------------------------ |
| `GET`    | `/producer/`               | Get all producers in the database                                                                      |
| `GET`    | `/producer/:rate`          | Get the producer with a [DJ Mag](https://www.edmhunters.com/top-100-djs/) rating of`:rate`             |
| `GET`    | `/producer/genres/:genres` | Get all producers that produce this set of genres. `:genres` is a comma separated string of EDM genres |
| `POST`   | `/producer/`               | **Requires a token**, Add a producer to the database                                                   |
| `PUT`    | `/producer/:id`            | **Requires a token**, Edit a producer with id of `:id`                                                 |
| `DELETE` | `/producer/:id`            | **Requires a token**, Delete a producer with id of `:id`                                               |

### Users

| Method | URI           | Action                                                            |
| ------ | ------------- | ----------------------------------------------------------------- |
| `POST` | `user/signup` | Sign up with the specified user credentials in the request        |
| `POST` | `user/signin` | Sign in with the specified user credentials to receive your token |

## Usage examples

- **Notes:**

  - Use any API client for testing, [example](https://www.getpostman.com/downloads/).
  - All sent and received data is in [JSON](https://www.json.org/) format.
  - We'll be using port 3000

- `GET` `http://localhost:3000/producer` :

  _Response_:

  **Status**: 200 OK

  ```json
  [
    {
      "genres": ["trance", "uplifting"],
      "djmagrating": 74,
      "_id": "5c81ec34001a733c28c7f2f9",
      "name": "Aly & Fila",
      "updatedAt": "2019-03-08T04:14:44.687Z",
      "createdAt": "2019-03-08T04:14:44.687Z",
      "__v": 0
    },
    {
      "genres": ["progressive"],
      "djmagrating": 59,
      "_id": "5c81ec40001a733c28c7f2fa",
      "name": "Deadmau5",
      "updatedAt": "2019-03-08T04:14:56.077Z",
      "createdAt": "2019-03-08T04:14:56.077Z",
      "__v": 0
    },
    {
      "genres": ["trance"],
      "djmagrating": 4,
      "_id": "5c81ec48001a733c28c7f2fb",
      "name": "Armin Van Buuren",
      "updatedAt": "2019-03-08T04:15:04.665Z",
      "createdAt": "2019-03-08T04:15:04.665Z",
      "__v": 0
    }
  ]
  ```

- `GET` `http://localhost:3000/producer/9`:

  _Response_:

  **Status**: 404 Not Found

  **Message**: Can't find the producer with this rating!

- `GET` `http://localhost:3000/producer/59`:

  _Response_:

  **Status**: 200 OK

  ```json
  [
    {
      "genres": ["progressive"],
      "djmagrating": 59,
      "_id": "5c81ec40001a733c28c7f2fa",
      "name": "Deadmau5",
      "updatedAt": "2019-03-08T04:14:56.077Z",
      "createdAt": "2019-03-08T04:14:56.077Z",
      "__v": 0
    }
  ]
  ```

- `GET` `http://localhost:3000/producer/genres/trance,uplifting`:

  _Response_:

  **Status**: 200 OK

  ```json
  [
    {
      "genres": ["trance", "uplifting"],
      "djmagrating": 74,
      "_id": "5c81ec34001a733c28c7f2f9",
      "name": "Aly & Fila",
      "updatedAt": "2019-03-08T04:14:44.687Z",
      "createdAt": "2019-03-08T04:14:44.687Z",
      "__v": 0
    }
  ]
  ```

- `POST` `http://localhost:3000/producer`:

  **_Request:_**

  ```json
  {
    "name": "Oliver Heldens",
    "djmagrating": 9,
    "genres": ["futurehouse"]
  }
  ```

  **_Response:_**

  **Status**: 401 Unauthorized

  **Message**: Please Sign in to continue.

---

**Database modification operations require authentication. We will need to create an account.**

---

- `POST` `http://localhost:3000/user/signup`:

  **_Request:_**

  ```json
  {
    "email": "newuser@newuser.com",
    "pass": "1234"
  }
  ```

  **_Response:_**

  **Status**: 201 Created

  **Message**: User registered successfully!

- `POST` `http://localhost:3000/user/signin`:

  **_Request:_**

  ```json
  {
    "email": "newuser@newuser.com",
    "pass": "1234"
  }
  ```

  **_Response:_**

  **Status**: 200 OK

  _Body_:

  ```json
  {
    "iat": 1552019993,
    "exp": 1552020893,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzgxZjE4OWVkZGJlMzQxZDQyY2IzMDciLCJlbWFpbCI6Im5ld3VzZXJAbmV3dXNlci5jb20iLCJwYXNzIjoiJDJhJDEwJGdOSHF1OVVuYXdmckxFT0xSTDJ1dC5CNktIU0MxSFJObkRDbWNKLmd1MWxkTS5VM0VGU1dLIiwidXBkYXRlZEF0IjoiMjAxOS0wMy0wOFQwNDozNzozMC4wMjFaIiwiY3JlYXRlZEF0IjoiMjAxOS0wMy0wOFQwNDozNzozMC4wMjFaIiwiX192IjowLCJpYXQiOjE1NTIwMTk5OTMsImV4cCI6MTU1MjAyMDg5M30.43jtfL8ABXo0d5ADqMFZCnCuzuliKauw7zWCAA7xPj0"
  }
  ```

---

**Now you can use this token when performing DB modification operations. This token expires after 15 minutes, you can sign in again to receive a new one.**

---

- `POST` `http://localhost:3000/producer`:

  **_Request:_**

  ```json
  {
    "name": "Oliver Heldens",
    "djmagrating": 9,
    "genres": ["futurehouse"]
  }
  ```

  **_Response:_**

  **Status**: 201 Created

  ```json
  {
    "genres": ["futurehouse"],
    "djmagrating": 9,
    "_id": "5c81f3b9adf5352a44658b8b",
    "name": "Oliver Heldens",
    "updatedAt": "2019-03-08T04:46:49.838Z",
    "createdAt": "2019-03-08T04:46:49.838Z",
    "__v": 0
  }
  ```

- `PUT` `http://localhost:3000/producer/5c81f3b9adf5352a44658b8b`:

  **_Request:_**

  ```json
  {
    "genres": ["futurehouse", "electrohouse"]
  }
  ```

  **_Response:_**

  Status: 201 Created

  ```json
  {
    "genres": ["futurehouse", "electrohouse"],
    "djmagrating": 9,
    "_id": "5c81f3b9adf5352a44658b8b",
    "name": "Oliver Heldens",
    "updatedAt": "2019-03-08T04:49:51.919Z",
    "createdAt": "2019-03-08T04:46:49.838Z",
    "__v": 0
  }
  ```
