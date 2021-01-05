const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');
const helmet = require('helmet');
const morgan = require ('morgan');
const app = express();
const genres = require('./routes/genres');
const home = require ('./routes/home');
app.set('view engine','pug');
app.set('views','./views'); //default

app.use(express.json());
app.use(express.urlencoded({extended: true}));// built in middleware
app.use(express.static('public'));// built in middleware
app.use(logger); // custom middleware 
app.use(authenticate);// custom middleware 
app.use(helmet()); // third party middleware
app.use('/api/genres', genres);
app.use('/', home);


if(app.get('env')=== 'development'){
app.use(morgan('tiny'));
startupDebugger('Morgan enabled...')
};

//db word
dbDebugger('connected to the database...');


app.listen(3000, ()=>{
    console.log('Listening on port 3000...')
});
