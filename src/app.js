// Express - Framework Back-end para apps web do NodeJS
import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

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
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    ); // Static para poder passar arquivos estáticos
  }

  routes() {
    this.server.use(routes); // Importando as rotas
  }
}
// Exportando o server
export default new App().server;
