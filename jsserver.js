// example 1
// how to use express to implement, get, post, and return status code
// test post with postman plugin for chrome

const express = require('express');


const courses = [
    { id: 1, name: 'courses1'},
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World !!");
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('course id not found')
    }
    res.status(200).send(course);

});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.status(200).send(course);
});

/*
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/subjects/:year/:month', (req, res) => {
    res.send(req.query);
});
*/


const host = '10.0.0.92'
const port = process.env.PORT || 8000;

app.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
});