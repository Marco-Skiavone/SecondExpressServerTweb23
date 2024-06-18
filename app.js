let express = require('express');
let path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const database = require("./databases/database");
const indexRouter = require('./routes/index');
const competitionRouter = require('./routes/competition');
const gameLineupsRouter = require('./routes/game_lineups');
const usersRouter = require('./routes/users');
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')();
const swaggerFile = require('./swagger/swagger-output.json');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/', indexRouter);
app.use('/competitions', competitionRouter);
app.use('/game_lineups', gameLineupsRouter);
app.use('/users', usersRouter);

module.exports = app;
