import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  // O Storage é como o multer vai guardar as informações
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'), // destino dos arquivos
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // Nome do arquivo . extensão
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
