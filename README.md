# Backend for Moventure
This is the backend service for Moventure, a travel technology platform focused on providing travel solutions and booking capabilities. The service is built using Node.js and Express and interacts with a MongoDB database for data management.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing
1. **Install Dependencies**
   Navigate to the backend directory and install the project dependencies.
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   Customize the environment configurations as needed. Begin by copying the contents from `example.json` to `development.json`, `production.json`, and `test.json` in the `env` folder:
   ```bash
   cat ./env/example.json | tee ./env/development.json ./env/production.json ./env/test.json > /dev/null
   ```
   Set up the Nodemailer with an app password for Gmail. Refer to [this guide](https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628) for details on generating an app password.

### Running the Application
To start the server, run:
```bash
npm run start
```
For development, using Nodemon to automatically restart the server upon file changes:
```bash
npm run dev
```

## Deployment
To deploy this on a live system, consider the following steps:
- Ensure environment variables are set according to the production environment.
- Use a process manager like PM2 for managing and keeping the Node.js server alive.
- Configure reverse proxy settings with Nginx if serving through a domain.

## Packages Used
This project utilizes several key NPM packages:

- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **Joi**: Powerful schema description language and data validator for JavaScript.
- **Nodemailer**: Module for sending emails from Node.js applications.
- **Bcrypt**: Library to help you hash passwords.
- **jsonwebtoken**: Implementation of JSON Web Tokens for secure data transmission.
- **Cors**: Package to enable CORS (Cross-Origin Resource Sharing) with various options.
- **Config**: Node.js module for managing configuration files.

For development, the following packages are used:
- **Nodemon**: Utility that monitors for any changes in your source and automatically restarts your server.
- **Jest**: Delightful JavaScript Testing Framework with a focus on simplicity.
- **Supertest**: Super-agent driven library for testing HTTP servers.
- **ESLint**: Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **ESLint-plugin-unicorn**: Linter plugin with some useful rules for improving code quality.

For a comprehensive list of all the packages, including their specific versions used in development, please refer to the `package.json` file in the project repository.

## API Endpoints

### Authentication and User Management

- **POST /api/auth**
  - Authenticates users and returns a token.
  - Used for user login sessions.

- **GET, POST, PUT, DELETE /api/users**
  - `GET`: Retrieves a list of all users or a specific user by ID.
  - `POST`: Creates a new user.
  - `PUT`: Updates an existing user's information.
  - `DELETE`: Deletes a user from the system.

- **POST /api/reset-password**
  - Initiates a password reset process for a user.
  - Users can request a password reset link.

### Booking and Travel Management

- **GET, POST, DELETE /api/bookings**
  - `GET`: Retrieves all bookings or a specific booking by ID.
  - `POST`: Creates a new booking.
  - `DELETE`: Cancels an existing booking.

### Destination Management

- **GET, POST, PUT, DELETE /api/destinations**
  - `GET`: Fetches all destinations or a specific destination by ID.
  - `POST`: Adds a new destination.
  - `PUT`: Updates details of an existing destination.
  - `DELETE`: Removes a destination from the system.

### Flight Offers

- **GET /api/flights/offers/:id**
  - Fetches flight offers based on id.
  - Used for displaying available flight options to users.

- **POST /api/flights/offers?{query_parameters}**
  - Retrieves flight offers with additional filtering options provided via query parameters.
  - Allows for customized searches of flight offers.
