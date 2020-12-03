const {config} = require('yargs');

require('env2')('src/config.env');
const {join} = require('path');

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');

const router = require('./routes');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(join(__dirname, '..', 'public'), {maxAge: '30d'}));

app.use('/api/v1', router);

app.use((req, res, next) => {
	res.status(404).sendFile(join(__dirname, '..', 'public', '404.html'));
});

app.use((err, req, res, next) => {
	res.status(500).sendFile(join(__dirname, '..', 'public', '500.html'));
});
module.exports = app;
