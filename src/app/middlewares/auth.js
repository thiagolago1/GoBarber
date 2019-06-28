// Middleware de Autenticação

import jwt from 'jsonwebtoken';

// Lib do Node - função que pega uma função de callback e transforma em uma função para ASYNC E AWAIT
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Descartando a primeira posição do array e pegando só o token
  const [, token] = authHeader.split(' ');

  try {
    // decoded -> valor retornado através do jwt.verify
    // Dentro do decod vai estar as informações do token
    // Repare que é uma função que chama outra função, por isso um parênteses depois do outro que é a função retornada
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid!' });
  }
};
