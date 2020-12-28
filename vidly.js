const express = require('express');
// const Joi = require('joi');
const app = express();
app.use(express.json);

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

const port = process.env.PORT||3000;
app.listen(3000, ()=> {
    console.log(`listening on port ${port}...`)
});
