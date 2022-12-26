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

> Outras bibliotecas, ferramentas e dependências: [Nodemon](https://nodemon.io/), [Joi](https://joi.dev/), [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), [Sinon](https://sinonjs.org/), [Istanbul](https://istanbul.js.org/) e [ESlint](https://eslint.org/)

## Instruções para Execução:

### ⚠️ Requisitos Mínimos
Para que o projeto possa ser executado localmente, é necessário que você possua instalado em seu sistema, as seguintes ferramentas:

- [Docker](https://www.docker.com/)
- [Thunder Client](https://www.thunderclient.com/) ou qualquer outro *API Client* como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/)
- [Database Client](https://database-client.com/#/)
> Aqui fica a recomendação de utilizar o Visual Studio como editor de código para a execução dessa aplicação, visto que tanto o Thunder Client como o Database são extensões do software.

O `Docker` é uma ferramenta de gerenciamento de ambientes, através de containers e imagens, quais serão utilizados nesse projeto para subir a aplicação em ambiente `Node` na versão `16` e o `MySQL` na versão `5.7`.

### 📝 Configurações

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
  Após configurar as variáveis de ambiente, é hora de subir o container da aplicação, o que nos dará o `Node` para que possamos executar o servidor da API, e o banco de dados `MySQL`.

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
  Agora com o container do `MySQL` *up*, é necessário estabelecer uma conexão com o banco de dados. Para isso será utilizada a extensão `Database Client` já citada nos requisitos mínimos da aplicação.

  Acessando a extensão, basta clicar na opção *Create Connection* no menu superior. Isso abrirá uma nova aba, com alguns campos para serem preenchidos:
  1. Selecione o **Server Type** `Mysql`;
  2. Preencha o campo **Host** com o valor `localhost`;
  3. O campo **Username** e **Password** devem ter respectivamente os valores `root` e `secret`;
  > Caso você tenha modificado o arquivo .env, devem ser os valores atribuídos nas variáveis MYSQL_USER e MYSQL_PASSWORD(Lembrando que esses valores devem ser iguais no arquivo docker-compose.yml).
  4. Por fim o campo **Port** deve ter o valor `3306`.
  > Ou a porta que foi exposta no arquivo docker-compose.yml e o valor atribuído na variável PORT do arquivo .env.

  Se tudo ocorreu corretamente, agora você verá a conexão listada na aba da extensão, no entanto ainda é preciso subir o *Banco de Dados*. Para isso, conecte-se ao container `store_manager_api` para poder realizar os comandos necessários.
  
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
    <b>⚙️ Subindo a API</b>
  </summary>
  
  ####
  Agora já é possível realizar as requisições no *Banco de Dados* a partir de um *API Client*, novamente é recomendado utilizar o *Thunder Client*.

  Conectado ao *Banco de Dados* com sucesso, e ainda com o container `store_manager_api` *up*, caso tenha fechado o terminal, novamente rode o comando:
  ```cli
  docker exec -it store_manager_api bash
  ```

  Dentro do container, se já tiver instalado as dependências e resetado os bancos como explicado nos passos anteriores, inicie o servidor com o comando abaixo:
  ```cli
  npm run dev
  ```
  > Se tudo ocorrer bem, você deverá receber no console, a mensagem: `Escutando na porta 3001`.

  Pronto, a *API* já está rodando e você já possui conexão com o banco. Agora basta realizar suas requisições. Na aba abaixo, segue a documentação das requisições.
</details>

<details>
  <summary>
    <b>🧪 Execução de Testes e CI</b>
  </summary>

  ####
  Para realizar os testes da aplicação, ou executar alguns comandos de CI é necessário primeiro estar conectado ao container `store_manager_api` como exemplificado em passos anteriores.
  
  ##### Testes Unitários
  Após a conexão com o container, se os pacotes do node houverem sido instalados, para executar os **Testes Unitários** basta rodar o comando abaixo no terminal do container:
  ```cli
  npm run test:dev:unit
  ```

  ##### Cobertura de Testes
  Se quiser conferir a cobertura dos testes unitários, basta rodar o comando:
  ```cli
  npm run test:dev:unit:coverage
  ```

  ##### Linter
  O Linter utilizado no código do programa foi o `Eslint`. Caso queira rodá-lo, basta que, seguindo os passos iniciais dos comandos anteriores, você digite o comando abaixo no terminal do container:
  ```cli
  npm run lint
  ```
</details>

## Documentação da API
Aqui você encontrará a lista dos *endpoints* da *API*. Alguns endpoints possuem requisições e métodos específicos para cada tipo de operação.
Para poder realizar as requisições, primeiro certifique-se de que o *Banco de Dados* continua rodando normalmente. Se a *API* também estiver *up*, seguindos os passos da seção **Subindo a API**, então é possível prosseguir.

Na extensão *Thunder Client* ou no *API Client* da sua escolha, você deverá encontrar algum botão com a opção **New Request** ou algo parecido. Ao clicar no botão, você poderá preencher algumas informações, as principais são o **Método**, **Endereço** e **Body**. O *Método* equivale ao tipo de requisição que será feita(POST, GET, PUT ou DEL), o *Endereço*, no entanto, será o endpoint; que nesse caso será sempre `localhost:3001/` onde 3001 é a porta designada para a *API* no arquivo `docker-compose.yml` e nas variáveis de ambiente do arquivo `.env`; seguido de mais algum parâmetro, que estará listado nas intruções de cada requisição. Por fim o *Body*, é a parte da requisição onde alguns dados devem ser fornecidos se aquele endpoint precisar.

Confira abaixo cada um dos métodos e endpoints disponíveis na *API*, com suas instruções mais detalhadas.

### 🛍 Produtos
<details>
  <summary>
    <b>✍️ Inserir Novo Produto</b>
  </summary>

  ####
  - Método: **POST**
  - Endpoint: `localhost:3001/products`

  Com esse método, você conseguirá inserir um novo produto no banco de dados, para isso basta enviar no *Body* da requisição um objeto com a seguinte estrutura:
  ```js
  {
    "name": "Martelo de Thor", // Deve ser uma string com o nome seu produto
    "quantity": 10 // Deve ser um inteiro com a quantidade do seu produto
  }
  ```

  Se criado com sucesso, a *API* retornará um *Status Code* `201` e um objeto com os seguintes dados:
  ```js
  {
    "id": 1,
    "name": "Martelo de Thor",
    "quantity": 10
  }
  ```

  Se alguma das chaves do *Body* da requisição for passada incorretamente, será retonado um *Status Code* `400` e um objeto similar ao demonstrado abaixo:
  ```js
  {
    "message": "\"chave\" is required"
  }
  ```

  Se algum dos valores no *Body* da requisição não for passado com o tipo correto, será retornado um *Status Code* `400` e um objeto similar ao demonstrado abaixo:
  ```js
  {
    "message": "\"valor\" must be a string"
  }
  ```
</details>

<details>
  <summary>
    <b>📋 Listar Todos Produtos</b>
  </summary>

  ####
  - Método: **GET**
  - Endpoint: `localhost:3001/products`

  Com esse método, você conseguirá listar todos os produtos cadastrados no banco de dados, para isso não é necessário enviar nada no *Body* da requisição, mas se tudo ocorrer com sucesso, a *API* retornará um *Status Code* `200` e um array de objetos com os dados de todos os produtos cadastrados, similar ao código abaixo:
  ```js
  [
    {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "Traje de encolhimento",
      "quantity": 20
    }
  ]
  ```

  Se não houver nenhum produto cadastrano no *Banco de Dados*, ainda será retornado um *Status Code* `200` porém com um array vazio:
  ```js
  []
  ```
</details>

<details>
  <summary>
    <b>🔍 Listar Um Produto</b>
  </summary>

  ####
  - Método: **GET**
  - Endpoint: `localhost:3001/products/{id}`
  
  Com esse método você conseguirá pesquisar por um produto específico baseado em seu `id`, que deve ser fornecido ao final do *Endpoint*.
  > Se estiver procurando pelo produto de id 1, por exemplo, o endpoint será: `localhost:3001/products/1`

  Se listado com sucesso, será retornado um *Status Code* `200` e um objeto com o produto pesquisado:
  ```js
  {
    "id": 1,
    "name": "Martelo do Thor",
    "quantity": 10
  }
  ```

  Se o `id` fornecido for inválido, será retornado um *Status Code* `404` e o seguinte objeto:
  ```js
  {
    "message": "Procut not found"
  }
  ```
</details>

<details>
  <summary>
    <b>✏️ Editar Um Produto</b>
  </summary>

  ####
</details>

<details>
  <summary>
    <b>🗑 Apagar Um Produto</b>
  </summary>

  ####
</details>

### 🛒 Vendas
<details>
  <summary>
    <b>✍️ Inserir Uma Venda</b>
  </summary>

  ####
</details>

<details>
  <summary>
    <b>🗑 Listar Todas Vendas</b>
  </summary>

  ####
</details>

<details>
  <summary>
    <b>🔍 Listar Uma Venda</b>
  </summary>

  ####
</details>

<details>
  <summary>
    <b>✏️ Editar Uma Venda</b>
  </summary>

  ####
</details>

<details>
  <summary>
    <b>🗑 Apagar Uma Venda</b>
  </summary>

  ####
</details>


## Propriedade intelectual e referências:
Toda a aplicação foi desenvolvida por mim de forma independente, sendo necessário isto, para minha aprovação no projeto. Toda a criação e implementação de Componentes, Estilos e Lógica para o cumprimento dos requisitos do projeto, por mim foram feitas, assim como os testes e configuações finais da aplicação como *Ambiente de Desenvolvimento* e *CI/CD*.
