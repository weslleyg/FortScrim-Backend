const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
	req.io = io;

	return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect('INSIRA SUA URL', {
	useNewUrlParser: true,
	useCreateIndex: true
});

app.use(require('./routes.js'));

server.listen(3333, () => {
	console.log('Servidor rodando em: http://localhost:3333/');
});
