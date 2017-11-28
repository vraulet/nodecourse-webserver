const express = require('express');
const path = require('path');
const hbs = require('hbs')
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'www')));
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `Page requested ${request.method} - ${request.url} at ${now}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n', (err) => {
        if (err) {
            console.log('error');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
    
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
// app.get('/', (request, response) => {
//     // response.send('<h1>Hello <b>Express</b></h1>');
//     response.send({name: 'Valery', age: 25});
// });

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Homepage HBS',
        welcomeMessage: 'Welcome to our super duper page'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About page HBS'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects page'
    });
});

app.get('/bad', (request, response) => {
    response.send({errorMessage: 'Unable to handle request'});
});
app.listen(port, () => {
    console.log(`server is up, port ${port}.`);
});