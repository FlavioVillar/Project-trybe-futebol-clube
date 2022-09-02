# Boas vindas ao repositório do Trybe Futebol Clube!

Projeto desenvolvido por estudante durante o curso de desenvolvimento front-end da **Trybe**

Projeto de com desenvolvimento de uma aplicação back-end capaz de se ligar à aplicação front-end, e fornecer os dados necessários para o seu correcto funcionamento.

Todo o código que foi escrito por mim está dentro da pasta backend, a aplicação front-end foi fornecida pela Trybe.

# Imagens da aplicação

<div align="center">
 <kbd>
   <img src="https://user-images.githubusercontent.com/94480963/188166689-f3c6903e-ca71-4ffe-bd0a-ce7454af3af2.png" width="700">
 </kbd>
</div>
<br />

# Tecnologias e ferramentas usadas.

- Typescript
- Node.js
- Express
- Sequelize 
- Jest
- Mocha
- Sinon
- Chai
- Joi
- jsonwebtoken
- dotenv
- POO - SOLID


# 👨‍💻 O que foi desenvolvido.

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

Projeto que criar jogos de futebol, onde é possível editar os time que se enfrentam e também os resultados dos jogos, e todos jogos gerados são contabilizados em uma tabela de classificação, que organiza a classificação conforme regra de negócio estabelecida. Para adicionar uma partida é necessário  a pessoa deverá estar logada para fazer as alterações, e validações de login são feitas com um _token_.

Esta aplicação desenvolveu uma API (utilizando o método `TDD`) e também integra *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados, e foi construído um back-end dockerizado utilizando modelagem de dados através do Sequelize, nonde a API é capaz de ser consumida por um front-end fornecido pela Trybe para este projeto.



Esta aplicação foi desenvolvida utilizando o Node.js, o framework Express.js e o Typescript, que consiste em um superconjunto Javascript, sempre buscando seguir os princípios do desenvolvimento orientado a testes.

Para realizar os testes de integração foram utilizados os frameworks Jest, Mocha.js, Sinon.js e a biblioteca Chai. Senhas e informações confidenciais foram salvas no banco de dados após o uso da biblioteca bcrypt e as rotas foram validadas por meio do JWT. Este projeto foi desenvolvido seguindo os princípios SOLID, sempre com o objetivo de construir um código limpo e legível.


# Orientações.

- Instale as aplicações na ***pasta raiz*** com:  `npm install` 

- Crie um arquivo .env (conforme exemplo em `app/backend/.env.example`)

- Execute o docker compose com o comando: `npm run compose:up:dev`

- Para reiniciar seus containers execute o comando: `npm run compose:down:dev`

- Se você precisar redefinir o banco de dados, execute o comando: `npm run db:reset`


* Testes

  * Para executar os testes, acesse o terminal dentro da pasta `app/backend`, e tenha os containers docker rodando.

  * Após verificar esses itens, execute o comando: `npm test`

  * Para rodar testes de cobertura utilize o comando: `npm run test:coverage`

## Como ver o aplicativo funcionando
Acesse http://localhost:3000, com todos os containers rodando.

Para fazer o login, use seguintes credenciais:

- `login: admin@admin.com`
- `password: secret_admin`
