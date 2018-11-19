import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import api from './routers';
const cors = require('cors')

const app = express();
app.disable('x-powered-by');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/*',cors())
app.use('/api', api);
// app.use('/', routes);

app.get('/', function(req, res){
  res.send("Hello World!");
});

export default app;
