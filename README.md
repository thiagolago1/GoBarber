# GoStack-GoBarber
Rocktseat training repository - bootcamp GoStack 

Pequena APIRestful com Nodejs e Express

Base do projeto:
- NodeJS
- Docker
- Express

### Para utilizar o projeto
- Instale o NodeJS;
- Instale o Docker caso queira rodar um banco local (via docker);
- Utilize algum cliente para testar as requisições HTTP via Rest (Recomendo Insomnia);
- Utilize o editor de sua preferencia.

### Docker para o banco (Opcional)
- Por padrão foi utilizado o PostgreSQL e MongoDB (Lembrando que este projeto é para aprendizado e por isso utiliza-se bancos diferentes para testar e aprender).

### Para rodar o servidor via nodemon, entre nas dependências do projeto e pelo terminal digite:
- A aplicação, por default, fica disponível em localhost:3333
```
cd /path/to/project
yarn dev
``` 

### Para rodar a Queue via nodemon, entre nas dependências do projeto e pelo terminal digite:
```
cd /path/to/project
yarn queue
```
