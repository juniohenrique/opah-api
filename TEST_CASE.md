# Explicação dos Casos de Teste Automatizados

Este documento descreve os testes automatizados implementados para a API RESTful de gerenciamento de usuários da plataforma Serverest. Os testes estão organizados por funcionalidades e cobrem os principais fluxos de autenticação e operações CRUD de usuários.

## Autenticação - `/login`

- **Deve autenticar com sucesso (admin)**  
  Testa se o login com credenciais válidas retorna status 200 e um token de autorização.

- **Não deve autenticar com senha incorreta**  
  Verifica se a API retorna status 401 e mensagem de erro ao usar uma senha inválida.

- **Não deve autenticar com email inexistente**  
  Garante que o login com email não cadastrado também retorne 401 com mensagem adequada.

- **Não deve autenticar sem email**  
  Testa a resposta da API quando o campo de email é omitido, esperando status 400.

## Leitura de Usuários - `GET /usuarios`

- **Deve listar todos os usuários com token válido**  
  Verifica se a listagem de usuários funciona com autenticação, retornando status 200 e um array.

- **Deve listar usuários sem token**  
  Testa se o endpoint permite a listagem mesmo sem autenticação.

- **Deve buscar um usuário por ID válido**  
  Recupera um usuário específico utilizando um ID válido.

- **Não deve encontrar usuário com ID inexistente**  
  Verifica a resposta da API ao buscar por um ID válido mas que não existe (espera-se status 400).

- **Não deve buscar usuário com ID malformado**  
  Tenta buscar usuário com um ID malformado, esperando status 400 ou 500.

## Criação de Usuários - `POST /usuarios`

- **Deve criar um novo usuário com sucesso**  
  Testa o cadastro de um usuário único, verificando se o ID é retornado e status 201.

- **Não deve permitir criação de usuário com email duplicado**  
  Tenta cadastrar um usuário com email já existente, esperando status 400 e mensagem de erro.

- **Não deve criar usuário com campos obrigatórios faltando**  
  Envia um payload com campos vazios e espera status 400 como retorno.

- **Não deve criar usuário com email inválido**  
  Testa a validação de formato do email, esperando erro de validação com status 400 ou 422.

## Atualização de Usuários - `PUT /usuarios/:id`

- **Deve atualizar nome de usuário existente**  
  Atualiza os dados de um usuário criado previamente, verificando status 200 e mensagem de sucesso.

- **Não deve atualizar usuário com ID inválido**  
  Tenta atualizar um usuário utilizando um ID malformado, esperando erro 400 ou 500.

- **Deve atualizar usuário sem token de autenticação**  
  Envia uma atualização sem o token de acesso e, de forma inesperada, recebe status 200 (comportamento da API).

- **Não deve atualizar com payload inválido**  
  Tenta atualizar com dados vazios e espera status 400 como resposta.

## Exclusão de Usuários - `DELETE /usuarios/:id`

- **Deve deletar um usuário com sucesso**  
  Remove um usuário criado durante o teste, verificando mensagem de exclusão bem-sucedida.

- **Deve deletar usuário com ID inexistente**  
  Tenta deletar um usuário com ID válido mas inexistente, e recebe status 200 (comportamento da API).

- **Deve deletar usuário com ID malformado**  
  Utiliza um ID inválido na requisição de deleção e a API ainda retorna status 200.

- **Deve deletar usuário sem autenticação**  
  Tenta excluir um usuário sem fornecer token e, mesmo assim, a API responde com status 200.

## Observações

Alguns testes retornam status inesperados (como 200 mesmo em operações inválidas ou não autorizadas). Esses comportamentos são da API Serverest e devem ser tratados com atenção em ambientes reais.

