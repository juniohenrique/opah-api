const request = require('supertest');
require('dotenv').config();

const api = request(process.env.API_URL);

function getAllUsers(token) {
  return api
    .get('/usuarios')
    .set('Authorization', token);
}

function getUserById(id, token) {
  return api
    .get(`/usuarios/${id}`)
    .set('Authorization', token);
}

function createUser(userData) {
  return api
    .post('/usuarios')
    .send(userData);
}

function updateUser(id, userData, token) {
  return api
    .put(`/usuarios/${id}`)
    .set('Authorization', token)
    .send(userData);
}

function updateUserWithoutToken(id, userData) {
  return api
    .put(`/usuarios/${id}`)
    .send(userData);
}

function deleteUser(id, token) {
  return api
    .delete(`/usuarios/${id}`)
    .set('Authorization', token);
}

function deleteUserWithoutToken(id) {
  return api
    .delete(`/usuarios/${id}`);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserWithoutToken,
  deleteUser,
  deleteUserWithoutToken,
};
