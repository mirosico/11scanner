const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();

const scannerRouter = require('./modules/scanner/scanner.router');
const usersRouter = require('./modules/user/user.router');

const authMiddleware = require('./middlewares/auth');


const app = express();

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
        accessControlAllowCredentials: true,
        accessControlAllowOrigin: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/scanner', authMiddleware, scannerRouter);
app.use('/user', usersRouter);

module.exports = app;
