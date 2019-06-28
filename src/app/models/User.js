// Model para aplicar o CRUD de Users

import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // Métedo que recebe o parâmetro sequelize
  static init(sequelize) {
    super.init(
      {
        // Enviar as colunas dentro da base de dados
        // Os dados não precisam ser um reflexo direto da base de dados
        // Virtual não existe na base de dados, só no código
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // Esse trecho de código vai ser executado antes de qualquer save de um usuário
    // Aqui abaixo, toda vez que o usuário passar um password, a aplicação vai criptografar o password
    // A numeração indica a 'força da criptografia', quanto maior, mais lenta a aplicação se torna
    // Então, toda vez que o password_hash que está na base de dados for criada, ela será transformada no
    // Password VIRTUAL e criptografado pelo bcryptjs
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;
