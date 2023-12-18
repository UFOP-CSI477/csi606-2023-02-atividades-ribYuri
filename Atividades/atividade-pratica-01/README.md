# **Atividade prática 1**

## Tecnologias utilizadas
 Para o desenvolvimento foi utilizado a linguagem JAVA versão 17 e Spring Boot na versão 
3.1.6. O banco de dados utilizado foi o PostgreSQL e uso do JPA para persistências dos dados. 
 Ainda foram utilizados algumas bibliotecas que facilitam o desenvolvimento como Validation para verificar de forma
automática as entradas na requisição, o FlyWay para gerenciar versões do banco, e por fim o Lombok que "esconde" a implementação 
de getters e setters.

## Banco de dados
Como dito, o banco utilizado no projeto é o [PostgreSQL](https://www.postgresql.org/) e para interface recomendo o uso do pgAdmin.
Nele devemos criar nosso banco e configurar o usuário admin para uso. O projeto já possui um banco configurado com a porta padrão
e com o nome "bloodDonation". Criando um banco com mesmo nome e porta padrão, basta trocar apenas o usuário e senha utilizados.

## Configurando e inicializando
Primeiro devemos clonar o projeto para a máquina. Também será necessário uma IDE que tenha suporte ao Java Spring boot
(utilizado e recomendado [Intellij](https://www.jetbrains.com/pt-br/idea/)).

Assim basta abrir o projeto e ir até o arquivo localizado em `src > main > resources > aplication.yml` para configurar a conexão com o banco de dados, colocando
sua url, username e password. 

Depois de configurado, basta executar o arquivo principal `BloodDonationScheduleApplication` e o servidor irá executar e 
indicar a porta no terminal. O Flyway se encarregará da criação das tabelas.

## Rotas e collection

No repositório está disponibilizado uma collection que foi utilizada no [Postman](https://www.postman.com/) com o nome
`BloodDonation_atv_1.postman_collection.json`. Basta abrir o arquivo, copiar todo o Json e então colar na área de import do
Postman.