// Modelpara aplicar o CRUD de Files

import { Model, Sequelize } from 'sequelize';

class File extends Model {
  // Métedo que recebe o parâmetro sequelize
  static init(sequelize) {
    super.init(
      {
        // Enviar as colunas dentro da base de dados
        // Os dados não precisam ser um reflexo direto da base de dados
        // Virtual não existe na base de dados, só no código
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            // Como formatar o valor
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
