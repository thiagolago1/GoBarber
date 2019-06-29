import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // Verificação de email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User Not Found ' });
    }

    // Verificação da senha
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password Does Not Match!' });
    }

    // Retornando as informações do usuário
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // Token Aleatório e 7 dias para expirar
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
