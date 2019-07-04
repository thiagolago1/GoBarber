import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    // Check para saber se o usuário logado é um provider
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is Not a Provider!' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    // Check para pegar os agendamentos do dia
    // que estarão entre 00:00:00 ~ 23:59:59
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          // Between é um operador de valor de comparação do sequelize
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
