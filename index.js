const app = require('./app.js');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const port = parseInt(process.env.PORT) || 3000;
app.set('port', port);

const server = http.createServer(app);


mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.listen(port);
