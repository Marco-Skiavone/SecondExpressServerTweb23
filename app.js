let express = require('express');
let path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const database = require("./databases/database");
const indexRouter = require('./routes/index');
const competitionRouter = require('./routes/competition');
const gameLineupsRouter = require('./routes/game_lineups');
const flagsRouter = require('./routes/flags');
const playerValuationsRouter = require('./routes/player_valuations');
const appearanceRouter = require('./routes/appearance');
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
app.use('/flags', flagsRouter);
app.use('/player_valuations', playerValuationsRouter);
app.use('/appearances', appearanceRouter);
app.use('/competitions', competitionRouter);
app.use('/game_lineups', gameLineupsRouter);

module.exports = app;
