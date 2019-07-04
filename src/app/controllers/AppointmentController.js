import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
  async index(req, res) {
    const appointments = await Appointment.findAll({
      // Listando agendamentos do usuário por data
      // Selecionando os atributos mostrando o relacionamento com o provider
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(appointments);
  }

  async store(req, res) {
    // Yup Lib controla o schema; faz validações
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed! ' });
    }

    const { provider_id, date } = req.body;

    // Checar se o provider_id é um provider
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'You Can Only Create Appointments with Providers! ' });
    }

    // ParseISO transforma a string "Exemplo: 2019-07-01T18:00:00-03:00" em objeto Date JavaScript
    // Start Of Hour pega apenas o início da hora e não minutos e segundos. "Ex: Se for 19h30, ele pega só 19h"
    const hourStart = startOfHour(parseISO(date));

    // Check para não passar datas passadas
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // Se o provider já não tem um horário. Em tese, não pode ter 2 agendamentos na mesma data
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available!' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
