// Express - Framework Back-end para apps web do NodeJS
import express from 'express';
import routes from './routes';

class App {
  /** O construtor ta iniciando o express, as middlewares e as routes por padrão,
  então sempre serão chamados */
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); // Habilitando a app para receber json
  }

  routes() {
    this.server.use(routes); // Importando as rotas
  }
}
// Exportando o server
export default new App().server;
