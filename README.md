# Projeto Store Manager

## Conceito
Essa é uma aplicação simples de um *Banco de Dados Relacional*. Esse banco simula o estoque de uma loja de produtos qualquer. Construída com **MySQL** e utilizando a *ORM* **Sequelize**, utilizei *Arquitetura de Três Camadas* e o *Paradigma Funcional* para construir as camadas de *Controllers*, *Services* e *Models* da aplicação. Trata-se de um *CRUD* de produtos e vendas, que atualmente pode ser realizado através de alguma extensão como o **Thunder Client**, **Postman** ou **Insomnia**, mas que ainda pretendo implementar um *frontend* simples mas que torne a aplicação mais prática.

## Tecnologias utilizadas 
- [Javascript](https://www.javascript.com/)
- [NodeJS](https://nodejs.org/en/about/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Express](https://expressjs.com/pt-br/)
- [Docker](https://www.docker.com/)

> Outras bibliotecas, ferramentas e dependências: [Nodemon](https://nodemon.io/), [Joi](https://joi.dev/), [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), [Sinon](https://sinonjs.org/), [Istanbul](https://istanbul.js.org/), [ESlint](https://eslint.org/), [Stylelint](https://stylelint.io/)

## Instruções para Execução:

### ⚠️ Requisitos Mínimos
Para que o projeto possa ser executado localmente, é necessário que você possua instalado em seu sistema, as seguintes ferramentas:

- [Docker](https://www.docker.com/)
- [Thunder Client](https://www.thunderclient.com/) ou qualquer outro *API Client* como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/)
- [Database Client](https://database-client.com/#/)
> Aqui fica a recomendação de utilizar o Visual Studio como editor de código para a execução dessa aplicação, visto que tanto o Thunder Client como o Database são extensões do software.

O `Docker` é uma ferramenta de gerenciamento de ambientes, através de containers e imagens, quais serão utilizados nesse projeto para subir a aplicação em ambiente `Node` na versão `16` e o `MySQL` na versão `5.7`.

### 📝 Etapas

<details>
  <summary>
    <b>📛 Configurando as Variáveis de Ambiente</b>
  </summary>

  ####
  Na raíz do projeto, há um arquivo `.env.example`, você deve renomeá-lo, deixando apenas `.env`. Esse arquivo deverá passar todas as variáveis de ambiente necessárias para a aplicação. Para motivos de teste, é recomendado que deixe as variáveis padrões, mas caso decida alterá-las, preste atenção para que não haja conflito com as variáveis do arquivo `docker-compose` nem com as portas.
</details>

<details>
  <summary>
    <b>🐋 Subindo o Container da Aplicação</b>
  </summary>

  ####
  Após configurar as variáveis de ambiente, é hora de subir o container da aplicação, o que nos dará o `Node` para que possamos executar o servidor da Api, e o banco de dados `MySQL`.

  Para isso, digite o comando abaixo no terminal, a partir da raíz do projeto:
  ```cli
  docker-compose up -d
  ```
  Com esse comando já deve ser possível visualizar os containers através do comando:
  ```cli
  docker container ps
  ```
</details>

<details>
  <summary>
    <b>🎲 Estabelecendo Conexão com o Banco de Dados</b>
  </summary>

  ####
  Agora com o container do `MySQL` é necessário estabelecer uma conexão com o banco de dados. Para isso será utilizada a extensão `Database Client` já citada nos requisitos mínimos da aplicação.

  Acessando a extensão, basta clicar na opção *Create Connection* no menu superior. Isso abrirá uma nova aba, com alguns campos para serem preenchidos:
  1. Selecione o *Server Type* `Mysql`;
  2. Preencha o campo *Host* com o valor atribuido no arquivo `.env`. Se você não realizou nenhum alteração, deverá ser `localhost`;
  3. O campo *Username* deve ser `root` e o campo *Password* deve ter o valor `secret` caso, novamente, nenhuma alteração tenha sido realizada no arquivo `.env`;
  4. Por fim o campo *Port* deve ter o valor `3306`.

  Se tudo ocorreu corretamente, agora você verá a conexão listada na aba da extensão, no entanto ainda é preciso subir o *Banco de Dados*. Para isso, conecte-se ao container `Node` para pode realizar os comandos necessários.
  
  Na raíz do projeto digite o comando abaixo para conectar-se ao container `Node`:
  ```cli
  docker exec -it store_manager_api bash
  ```

  Um novo terminal deverá ser aberto, primeiramente instale as dependências com o comando:
  ```cli
  npm install
  ```

  Em seguida digite o comando abaixo para subir o banco `StoreManager`:
  ```cli
  npm run db:reset
  ```

  Pronto, agora você já deve conseguir visualizar na aba da extensão *Database Client* o banco de dados *StoreManager* e suas respectivas tabelas com a população inicial.
</details>

<details>
  <summary>
    <b>🔎 Realizando as Requisições</b>
  </summary>
  
  ####
  Lorem Ipsum
</details>

<details>
  <summary>
    <b>🧪 Execução de Testes e CI</b>
  </summary>

  ####
  Lorem Ipsum
</details>

## Propriedade intelectual e referências:
Toda a aplicação foi desenvolvida por mim de forma independente, sendo necessário isto, para minha aprovação no projeto. Toda a criação e implementação de Componentes, Estilos e Lógica para o cumprimento dos requisitos do projeto, por mim foram feitas, assim como os testes e configuações finais da aplicação como *Ambiente de Desenvolvimento* e *CI/CD*.
