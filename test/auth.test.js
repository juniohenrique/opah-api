const { expect } = require('chai');
const { login } = require('../services/auth.service');

describe('Autenticação - /login', () => {
  it('Deve autenticar com sucesso (admin)', async () => {
    const res = await login('testett@qa.com.br', 'teste');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('authorization');
  });

  it('Não deve autenticar com senha incorreta', async () => {
    const res = await login('fulano@qa.com', 'senhaErrada');
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Email e/ou senha inválidos');
  });

  it('Não deve autenticar com email inexistente', async () => {
    const res = await login('inexistente@email.com', '123456');
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Email e/ou senha inválidos');
  });

  it('Não deve autenticar sem email', async () => {
    const res = await login('', '123456');
    expect(res.status).to.equal(400);
  });
});
