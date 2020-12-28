const config = require('config');
const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const authenticate = require('./authenticate');
const helmet = require('helmet');
const morgan = require ('morgan');
const app = express();

//configuration
console.log('application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));



app.use(express.json());
app.use(express.urlencoded({extended: true}));// built in middleware
app.use(express.static('public'));// built in middleware
app.use(logger); // custom middleware 
app.use(authenticate);// custom middleware 
app.use(helmet()); // third party middleware

if(app.get('env')=== 'development'){
app.use(morgan('tiny'));
console.log('Morgan enabled');
}





const genres = [
    {id:'1', name:'Action'},
    {id:'2', name:'Comendy'},
    {id:'3', name:'Drama'}
];

app.get('/', (req, res)=>{
    res.send("Welcome to VIDLY");
});

app.get('/api/genres',(req,res)=>{
    res.send(genres);
});

app.get('/api/genres/:id', (req,res)=>{
const genre = genres.find(g => g.id == parseInt(req.params.id));
if(!genre) return res.status(404).send("The genre with the given ID was not found");
res.send(genre);
});

app.post('/api/genres', (req,res)=>{
    console.log(req.body.name);
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req,res)=>{
    const genre = genres.find(g => g.id == parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with the given ID was not found");

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name; 
    res.send(genre);

});

app.delete('/api/genres/:id', (req,res)=>{
    const genre = genres.find(g => g.id == parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with the given ID was not found");

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);
});


function validateGenre(genre){
    const schema = {
        name: Joi.required()
    };
    return Joi.validate(genre, schema );
}



app.listen(3000, ()=>{
    console.log('Listening on port 3000...')
});
