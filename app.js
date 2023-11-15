const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const scannerRouter = require('./modules/scanner/scanner.router');
const usersRouter = require('./modules/user/user.router');

const authMiddleware = require('./middlewares/auth');


const app = express();

app.use(cors(
    {
        origin: 'http://localhost:8000',
        credentials: true,
        accessControlAllowCredentials: true,
        accessControlAllowOrigin: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/scanner', scannerRouter);
//app.use('/scanner', authMiddleware, scannerRouter);
app.use('/users', usersRouter);

module.exports = app;
