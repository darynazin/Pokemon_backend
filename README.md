## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Setting Up Environment Variables

1. Create a `.env` file in the root directory.
2. Add the following variables to the `.env` file:
   ```env
   PORT=8080
   MONGO_URI=<your_mongoDB_connection_string>
   ```
---

## Running the Server

1. Start the server:
   ```bash
   npm run dev
   ```

## Using the API in Postman

### Base URL

```
http://localhost:8080
```

### Endpoints

#### 1. **Get All Users**

- **URL**: `/users`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "_id": "67a3f1d568393333a889d731",
        "username": "Fry",
        "password": "12345678",
        "roster": [],
        "score": 10,
        "__v": 19
    },
    {
      "_id": "67a3f43f3a4f6db0f8cc18df",
        "username": "Leela",
        "password": "87654321",
        "roster": [1, 2],
        "score": 0,
        "__v": 0
    }
  ]
  ```

#### 2. **Get User by ID**

- **URL**: `/users/:id`
- **Method**: `GET`
- **Response**:
  ```json
  {
      "_id": "67a3f43f3a4f6db0f8cc18df",
        "username": "Leela",
        "password": "87654321",
        "roster": [1, 2],
        "score": 0,
        "__v": 0
    }
  ```

#### 3. **Create a New User**

- **URL**: `/users`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "username": "Amy",
    "password": "12345432"
  }
  ```
- **Response**:
  ```json
  {
    "username": "Amy",
    "password": "12345432",
    "roster": [],
    "score": 0,
    "_id": "67a4ad9934086150ee8394fa",
    "__v": 0
  }
  ```

#### 4. **Update a User by ID**

- **URL**: `/users/:id`
- **Method**: `PUT`
- **Body** (JSON):
  ```json
  {
    "username": "Bender",
    "password": "123123123"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "67a4ae2134086150ee839501",
    "username": "Bender",
    "password": "123123123",
    "roster": [],
    "score": 0,
    "__v": 0
  }
  ```

#### 5. **Delete a User by ID**

- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "message": "User deleted",
  }
  ```

#### 6. **Add Pokemon to User roster**

- **URL**: `/users/:id/roster/pokemonId`
- **Method**: `POST`
- **Response**:
  ```json
  {
     "message": "Pokemon added successfully!",
    "user": {
        "_id": "67a4ae1234086150ee8394ff",
        "username": "Zoidberg",
        "password": "12345432",
        "roster": [
            12
        ],
        "score": 0,
        "__v": 1
    }
  }
  ```

#### 7. **Delete Pokemon from User roster**

- **URL**: `/users/:id/roster/pokemonId`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
     "message": "Pokemon deleted successfully!",
    "user": {
        "_id": "67a4ae1234086150ee8394ff",
        "username": "Zoidberg",
        "password": "12345432",
        "roster": [],
        "score": 0,
        "__v": 2
    }
  }
  ```

  #### 8. **Get Users from Leaderbord**

- **URL**: `/leaders`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
        "_id": "67a4047fb3fde0fded35d46b",
        "username": "Add your name",
        "score": 10,
        "date": "2025-02-06T00:38:23.280Z",
        "__v": 0
    },
    {
        "_id": "67a4b17f3f7a5e22360f2578",
        "username": "Zoidberg",
        "score": 10,
        "date": "2025-02-06T12:56:31.329Z",
        "__v": 0
    }
  ]
  ```

  #### 8. **Add/Update User in Leaderbord**

- **URL**: `/leaders`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  { 
    "userId": "67a4ae1234086150ee8394ff", 
   "score": 10
   }
  ```

- **Response**:
  ```json
  {
    "message": "User added(updated) successfully",
    "found": {
        "username": "Amy",
        "score": 11,
        "_id": "67a4b6a9ab6e81aa3f7d93af",
        "date": "2025-02-06T13:18:33.300Z",
        "__v": 0
    }

  }
  ```
  