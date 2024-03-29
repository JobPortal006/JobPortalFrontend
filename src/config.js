// config.js
require('dotenv').config(); // This loads the variables from .env into process.env

const BASE_URL = process.env.BASE_URL;

module.exports = BASE_URL;
