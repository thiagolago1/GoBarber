import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    // Verificar 'se não' existe o date
    if (!date) {
      return res.status(400).json({ error: 'Invalid Date!' });
    }

    // Transformar a data em número inteiro
    const searchDate = Number(date);

    // Filtro para pegar agendamentos da data
    // Verificar disponibilidade dos horários
    // Verificar se o horário já está marcado
    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          // Between é um operador de valor de comparação do sequelize
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    // Horários disponíveis que o provider possui
    const schedule = [
      '08:00', // 2019-07-09 08:00:00 Exemplos
      '09:00', // 2019-07-09 09:00:00
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    // Percorrendo a Schedule e transformando em Time
    const available = schedule.map(time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !appointment.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
