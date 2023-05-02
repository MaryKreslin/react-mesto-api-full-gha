require('dotenv').config();
import express from 'express';
import { connect } from 'mongoose';
import { env, on } from 'process';
import { json, urlencoded } from 'body-parser';
import { errors } from 'celebrate';
import NotFoundErr from './errors/notFoundErr';
import handleErrors from './middlewares/handleErrors';
import { auth } from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import routes from './routes/index';

const { PORT = 3000 } = env;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

on('uncaughtException', (err) => {
  console.log(err);
});
connect(
  'mongodb://127.0.0.1:27017/mestodb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use('*', auth, (req, res, next) => {
  const err = new NotFoundErr('Страница не найдена');
  next(err);
});

app.use(handleErrors);

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error while starting server');
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});
