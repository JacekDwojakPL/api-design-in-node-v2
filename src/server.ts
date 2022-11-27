import express from 'express';
import router from './router';
import morgan from 'morgan';
import { protect } from './utils/auth';
import { createNewUser, signIn } from './handlers/user';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signIn);

app.get('/', (req, res) => {
  return res.json({ data: 'it works' });
});

app.use((error, req, res, next) => {
  if (error.type === 'auth') {
    res.status(401);
    return res.json({ error: 'not authorized' });
  }

  if (error.type === 'input') {
    res.status(400);
    return res.json({ error: 'invalid input' });
  }

  res.status(500);
  return res.json({ data: 'internal server error' });
});

export default app;
