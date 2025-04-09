const { login } = require('../../services/auth.service');

async function getAdminToken() {
  const res = await login('testett@qa.com.br', 'teste');
  if (res.status !== 200) {
    throw new Error('Failed to get admin token');
  }
  return res.body.authorization;
}

module.exports = {
  getAdminToken,
};
