const { expect } = require('chai');
const { getAllUsers, getUserById } = require('../services/users.service');
const { getAdminToken } = require('./helpers/token.helper');

describe('Leitura de Usuários - /usuarios', () => {
  let token;

  before(async () => {
    token = await getAdminToken();
  });

  it('Deve listar todos os usuários com token válido', async () => {
    const res = await getAllUsers(token);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('usuarios').that.is.an('array');
  });

  it('Deve listar usuários sem token', async () => {
    const res = await getAllUsers('');
    expect(res.status).to.equal(200);
  });

  it('Deve buscar um usuário por ID válido', async () => {
    const allUsers = await getAllUsers(token);
    const userId = allUsers.body.usuarios[0]._id;

    const res = await getUserById(userId, token);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('nome');
    expect(res.body).to.have.property('email');
  });

  it('Não deve encontrar usuário com ID inexistente', async () => {
    const res = await getUserById('000000000000000000000000', token);
    expect(res.status).to.equal(400); // ou 404 dependendo do retorno da API
  });

  it('Não deve buscar usuário com ID malformado', async () => {
    const res = await getUserById('id-invalido', token);
    expect(res.status).to.be.oneOf([400, 500]);
  });
});

const { createUser } = require('../services/users.service');

describe('Criação de Usuários - /usuarios', () => {
  const timestamp = Date.now();
  const uniqueEmail = `user${timestamp}@email.com`;

  it('Deve criar um novo usuário com sucesso', async () => {
    const res = await createUser({
      nome: 'Novo Usuário QA',
      email: uniqueEmail,
      password: 'senha123',
      administrador: 'true',
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'Cadastro realizado com sucesso');
    expect(res.body).to.have.property('_id');
  });

  it('Não deve permitir criação de usuário com email duplicado', async () => {
    const res = await createUser({
      nome: 'Usuário Existente',
      email: 'fulano@qa.com',
      password: '123456',
      administrador: 'false',
    });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Este email já está sendo usado');
  });

  it('Não deve criar usuário com campos obrigatórios faltando', async () => {
    const res = await createUser({
      nome: '',
      email: '',
      password: '',
      administrador: '',
    });

    expect(res.status).to.equal(400);
  });

  it('Não deve criar usuário com email inválido', async () => {
    const res = await createUser({
      nome: 'Email Inválido',
      email: 'emailinvalido',
      password: 'senha123',
      administrador: 'true',
    });

    expect(res.status).to.be.oneOf([400, 422]);
  });
});

const { updateUser, updateUserWithoutToken } = require('../services/users.service');

describe('Atualização de Usuário - /usuarios/:id', () => {
  let token;
  let userId;

  before(async () => {
    token = await getAdminToken();

    // Criar usuário para editar
    const res = await createUser({
      nome: 'Usuario Para Atualizar',
      email: `update${Date.now()}@mail.com`,
      password: 'senha123',
      administrador: 'false',
    });

    userId = res.body._id;
  });

  it('Deve atualizar nome de usuário existente', async () => {
    const res = await updateUser(userId, {
      nome: 'Nome Atualizado',
      email: `update${Date.now()}@mail.com`,
      password: 'novaSenha123',
      administrador: 'true',
    }, token);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Registro alterado com sucesso');
  });

  it('Não deve atualizar usuário com ID inválido', async () => {
    const res = await updateUser('idinvalido', {
      nome: 'Teste Inválido',
      email: 'teste@email.com',
      password: '123456',
      administrador: 'false',
    }, token);

    expect(res.status).to.be.oneOf([400, 500]);
  });

  it('Deve atualizar usuário sem token de autenticação', async () => {
    const res = await updateUserWithoutToken(userId, {
      nome: 'Teste sem token',
      email: `notoken${Date.now()}@mail.com`,
      password: '123456',
      administrador: 'false',
    });
  
    expect(res.status).to.equal(200);
  });

  it('Não deve atualizar com payload inválido', async () => {
    const res = await updateUser(userId, {
      nome: '',
      email: '',
      password: '',
      administrador: '',
    }, token);

    expect(res.status).to.equal(400);
  });


});

const { deleteUser, deleteUserWithoutToken } = require('../services/users.service');

describe('Exclusão de Usuário - /usuarios/:id', () => {
  let token;
  let userId;

  before(async () => {
    token = await getAdminToken();

    // Criar usuário para deletar
    const res = await createUser({
      nome: 'Usuario Deletável',
      email: `delete${Date.now()}@mail.com`,
      password: 'senha123',
      administrador: 'false',
    });

    userId = res.body._id;
  });

  it('Deve deletar um usuário com sucesso', async () => {
    const res = await deleteUser(userId, token);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Registro excluído com sucesso');
  });

  it('Deve deletar usuário com ID inexistente', async () => {
    const res = await deleteUser('000000000000000000000000', token);
    expect(res.status).to.equal(200);
  });

  it('Deve deletar usuário com ID malformado', async () => {
    const res = await deleteUser('id-invalido', token);
    expect(res.status).to.equal(200);
  });

  it('Deve deletar usuário sem autenticação', async () => {
    const userRes = await createUser({
      nome: 'Sem Token',
      email: `sem-token${Date.now()}@mail.com`,
      password: 'senha123',
      administrador: 'false',
    });
  
    const tempUserId = userRes.body._id;
  
    const res = await deleteUserWithoutToken(tempUserId);
    expect(res.status).to.equal(200);
  });
});

