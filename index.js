import dotenv from 'dotenv';
import { log } from './utils';
import app from './routes';

dotenv.config();

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`);
});
