const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('@babel/register');
require('dotenv').config();
const cors = require('cors')

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const dbCheck = require('./db/testConnectionDb');
// const passUserFromSession = require('./src/middleware/passUserFromSession');

const appRouter = require('./routers/appRouters');
const userRouter = require('./routers/userRouters');

const sessionConfig = {
  store: new FileStore({}),
  name: 'user_sid',
  secret: process.env.SECRET || 'privetBober',
  resave: false,

  // Если - true можно делать аутентификацию без авторизации
  // Если false - только авторизация + аутентификация
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    secure: false, //  secure: false настройка для отключения передачи кук только по https
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
		},
};

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3000/', 'https://somesite.com'], 
    credentials:true,
  }

const app = express();

app.use(cors(corsOptions))

app.use(session(sessionConfig));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(passUserFromSession);


app.use((req, res, next) => {
  console.log('Промежуточная midllware');
  next();
});

const PORT = process.env.PORT || 3000;

dbCheck();

app.get('/', appRouter);
app.use('/api/user', userRouter);

app.listen(PORT, (err) => {
  if (err) return console.log('Ошибка запуска сервера.', err.message);
  return console.log(`Сервер запущен на http://localhost:${PORT} `);
});
