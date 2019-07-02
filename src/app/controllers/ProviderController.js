import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      // Retornando apenas os usuários que são providers
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'], // Atributos que serão retornados no where
      include: [File],
    });
    return res.json(providers);
  }
}

export default new ProviderController();
