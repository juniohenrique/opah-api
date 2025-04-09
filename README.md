# API Test Automation - Serverest

Este projeto realiza testes automatizados para a API RESTful [Serverest](https://serverest.dev/#/), cobrindo 100% dos endpoints de gerenciamento de usuários com autenticação via JWT, incluindo criação, leitura, atualização e exclusão.

![Node.js](https://img.shields.io/badge/node.js-18.x-green.svg)
![Mocha](https://img.shields.io/badge/tested%20with-mocha-blue.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)
![CI](https://github.com/juniohenrique/opah-api/actions/workflows/ci.yml/badge.svg)


---

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Supertest](https://github.com/ladjs/supertest)
- [Allure Report](https://docs.qameta.io/allure/)
- [GitHub Actions](https://github.com/features/actions) para CI

---

## Estrutura de pastas

```
.
├── data/
├── services/
├── test/
├── reports/
├── .github/workflows/
├── .env
├── package.json
└── README.md
```

---

## Como configurar o ambiente

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/serverest-api-tests.git
cd serverest-api-tests
```

2. **Instale as dependências**

```bash
npm install
```

3. **Crie um arquivo `.env`**

```env
BASE_URL=https://serverest.dev
```

---

## Como executar os testes

```bash
npm test
```

### Gerar relatório Allure

```bash
npm run report
```

---

## Casos de teste cobertos

-  Listagem de todos os usuários
-  Detalhamento de usuário por ID
-  Criação de usuário (com e sem sucesso)
-  Validações de campos obrigatórios e formatos inválidos
-  Atualização de usuário (com e sem autenticação)
-  Exclusão de usuário (com e sem autenticação)

Mais detalhes sobre os cenários cobertos estão disponíveis no arquivo [TEST_CASE.md](./TEST_CASE.md).


---

##  CI com GitHub Actions

```yaml
name: API Tests

on:
  push:
    branches: [ "main" ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do repositório
        uses: actions/checkout@v3

      - name: Configurar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Instalar dependências
        run: npm install

      - name: Executar testes
        run: npm test

      - name: Gerar relatório Allure
        run: npm run report:ci

      - name: Publicar relatório como artefato
        uses: actions/upload-artifact@v4
        with:
          name: allure-report
          path: ./reports/allure-report
```

---

##  Autor

Junio Henrique Miguel de Oliveira  
Analista de Testes | QA Engineer  
 [juunio.henriquee@gmail.com](mailto:juunio.henriquee@gmail.com)

---

## Licença

MIT
