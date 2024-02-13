# **CSI606-2021-02 - Trabalho Final - Resultados**

## *Aluna(o): Yuri Ribeiro*

--------------

<!-- Este documento tem como objetivo apresentar o projeto desenvolvido, considerando o que foi definido na proposta e o produto final. -->

### Resumo

  O projeto se trata de uma loja online, ou e-commerce de produtos.

### 1. Funcionalidades implementadas
Foram desenvolvidas todas as funcionalidades CRUD padrões e então o site (frontend) possui as seguintes features: 
* Divisão por categorias
* Pesquisa por nome
* Pesquisa por categorias
* Página de detalhes do produto
* Cadastro de novos produtos
  
### 2. Funcionalidades previstas e não implementadas
Todas as funcionalidades previstas foram desenvolvidas.

### 3. Outras funcionalidades implementadas
A fim de ter uma base de dados inicial, a API faz a inserção automática desses dados caso a base esteja vazia.

### 4. Principais desafios e dificuldades
Os principais desafios se deram no desenvolvimento dos pefis de usuário e autenticações, bem como a funcionalidade de carrinho. Ambas não estavam previstas no escopo devido sua complexidade e tempo de desenvolvimento considerado.

Além disso, o projeto serviu como um meio de estudo para o framework spring boot (Java), gerando então várias horas de estudo e aprendizado.

### 5. Instruções para instalação e execução
#### Backend
##### Banco de Dados
O banco utilizado no projeto é o [PostgreSQL](https://www.postgresql.org/) e para interface recomendo o uso do pgAdmin. Nele devemos criar nosso banco e configurar o usuário admin para uso. O projeto já possui um banco configurado com a porta padrão e com o nome "fakeStore". Criando um banco com mesmo nome e porta padrão, basta trocar apenas o usuário e senha utilizados.

##### Configurando e iniciando
Primeiro devemos clonar o projeto para a máquina. Também será necessário uma IDE que tenha suporte ao Java Spring boot (utilizado e recomendado [Intellij](https://www.jetbrains.com/pt-br/idea/)).

Assim para configurar o banco, basta abrir o projeto e ir até o arquivo localizado em `src > main > resources > aplication.yml` e então configurar a conexão com o banco de dados, colocando sua url, username e password.

Com o banco configurado basta inicializar a aplicação (`FakeStoreApplication`), e então o projeto se encarregará do resto, criando as tabelas e fazendo a inserção dos dados iniciais.

Caso queira testar a API, o repositório possui uma collection com o nome "FakeStoreSpring" que pode ser importada no [Postman](https://www.postman.com/) 

#### Frontend
Para o front basta abrir o projeto, iniciar o terminal e executar `npm install` para que as dependências sejam instaladas. 
Caso precise configurar as rotas basta ir até o arquivo `src > services > api.js` e editar.

Com o backend inicializado e funcionando basta executar o comando `npm run dev` no terminal e abrir no navegador o endereço que será indicado.

### 6. Referências
<!-- Referências podem ser incluídas, caso necessário. Utilize o padrão ABNT. -->
A API foi desenvolvida tendo como referência a estrutura da [Fake Store API](https://fakestoreapi.com/) (rotas e estrutura dos objetos). A base de dados utilizada também provém da API.