const request = require('supertest');
require('dotenv').config();

const api = request(process.env.API_URL);

function login(email, password) {
  return api
    .post('/login')
    .send({ email, password });
}

module.exports = {
  login,
};
