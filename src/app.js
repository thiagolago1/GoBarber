// Express - Framework Back-end para apps web do NodeJS
import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import 'express-async-errors';
import routes from './routes';

import './database';

class App {
  /** O construtor ta iniciando o express, as middlewares e as routes por padrão,
  então sempre serão chamados */
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json()); // Habilitando a app para receber json
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    ); // Static para poder passar arquivos estáticos
  }

  routes() {
    this.server.use(routes); // Importando as rotas
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // Método para captar os errors
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();

      return res.status(500).json(errors);
    });
  }
}
// Exportando o server
export default new App().server;
