import * as dotenv from 'dotenv';
import config from './config/index';
dotenv.config();
import app from './server';

app.listen(config.port, () => {
  console.log('server listening on port', config.port);
});
