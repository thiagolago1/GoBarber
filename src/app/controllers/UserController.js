import User from '../models/User';

class UserController {
  async store(req, res) {
    // Verificar se o email já existe
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User Already Exists.' });
    }
    // Fim da verificação

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    console.log(req.userId);
    return res.json({ ok: true });
  }
}

export default new UserController();
