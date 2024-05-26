# User Authentication API

This is a simple Node.js application for user authentication using JSON Web Tokens (JWT). It provides endpoints for user signup, login, and fetching user details.

## Features

- User signup: Allows users to create a new account by providing an email and password.
- User login: Allows existing users to log in using their email and password.
- Fetch user details: Provides user details such as email and name after successful authentication.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcryptjs (for password hashing)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Re1435/skygoal-tech-assignment.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory of the project and define the following variables:

   ```
   PORT=3001
   MONGODB_URI=mongodb+srv://reddymahereddy143:mahi1424@cluster0.aynufzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET_KEY=Mahe1424
   ```

   Replace `your_secret_key` with your preferred secret key for JWT token generation.

4. Start the server:

   ```bash
   nodemon server.js
   ```

## Usage

### User Signup

- **URL**: `/user/signup`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "email": "example@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- On success, returns status code `201` with a message: `{ "message": "User created successfully" }`.

### User Login

- **URL**: `/user/login`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "email": "example@example.com",
    "password": "password123"
  }
  ```

- On success, returns status code `200` with a JWT token: `{ "token": "your_generated_token" }`.

### Fetch User Details

- **URL**: `/user/userDetails`
- **Method**: `GET`
- **Headers**:

  - `Authorization`: `Bearer your_generated_token`

- On success, returns status code `200` with user details: `{ "email": "example@example.com", "name": "John Doe" }`.
