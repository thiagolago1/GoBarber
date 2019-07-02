// Modelpara aplicar o CRUD de Appointments

import { Model, Sequelize } from 'sequelize';

class Appointment extends Model {
  // Métedo que recebe o parâmetro sequelize
  static init(sequelize) {
    super.init(
      {
        // Enviar as colunas dentro da base de dados
        // Os dados não precisam ser um reflexo direto da base de dados
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // Relacionamento das tabelas Agendamento - Usuário e Agendamento - Provider
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
