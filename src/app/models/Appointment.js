// Modelpara aplicar o CRUD de Appointments

import { Model, Sequelize } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  // Métedo que recebe o parâmetro sequelize
  static init(sequelize) {
    super.init(
      {
        // Enviar as colunas dentro da base de dados
        // Os dados não precisam ser um reflexo direto da base de dados
        // Virtual não existe na base de dados, só no código
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          // Verificar se a data do lançamento é anterior a atual
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        // Se o agendamento é cancelável
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
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
