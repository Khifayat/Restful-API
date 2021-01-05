const express = require ('express');
const Joi = require('joi');
const logger = require('./logger');
const authenticate = require('./authenticate');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


app.use(logger);
app.use(authenticate);

const courses = [
    {id:'1', name: 'course 1'},
    {id:'2', name: 'course 2'},
    {id:'3', name: 'course 3'}
];

app.get('/', (req,res)=>{
res.render('index', {title: 'My Express App', message: 'Hello'});
});

app.get('/api/courses', (req,res) => {
res.send(courses);
});

app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course); //404
    });

app.post('/api/courses', (req,res)=>{
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        
    
 const course = {
    id: courses.length + 1,
    name: req.body.name
};
courses.push(course);
res.send(course);
});

app.put('/api/courses/:id', (req, res)=>{
//look up the course
//if non existant return 404
const course = courses.find(c => c.id == parseInt(req.params.id));
if(!course) return res.status(404).send('The course with the given ID was not found.');

//validate
//if invalid return 400 - bad request 
const schema = {
    name: Joi.string().min(3).required()
};
const { error } = validateCourse(req.body);
if(error) return res.status(400).send(error.details[0].message);
    


//updated course
course.name = req.body.name;
//return updated course
res.send(course);
});

app.delete('/api/courses/:id', (req, res)=>{
    //look up course
    //not exist, return 404
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');
    //delete
    const index = courses.indexOf(course);
    courses.splice(index,1);
    //return the same course
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema );
}

const port = process.env.PORT||3000;
app.listen(3000, ()=> {
    console.log(`listening on port ${port}...`)
});