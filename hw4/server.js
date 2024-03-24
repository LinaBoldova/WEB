const express = require('express');
const bodyParser = require('body-parser');
const { connectToDb, getDb } = require('./db');

const app = express();
let db;

app.use(express.static('resources'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log('GET request received for "/"'); 
    res.render('index');
});

app.get('/form', (req, res) => {
    console.log('GET request received for "/form"'); 
    res.render('form');
});

app.post('/send', (req, res) => {
    console.log('POST request received for "/send"'); 
    console.log('Received form data:', req.body); 
    db.collection('reviews').insertOne(req.body)
        .then(() => {
            console.log('Data inserted successfully'); 
            res.status(200).end();
        })
        .catch((error) => {
            console.error('Error inserting data:', error); 
            res.status(500).send('Error');
        });

    res.redirect('/data');
});

app.get('/data', (req, res) => {
    console.log('GET request received for "/data"'); 
    db.collection('reviews').findOne({}, { sort: { $natural: -1 } })
        .then(result => {
            console.log('Data retrieved from database:', result); 
            res.render('data', {
                name: result.name,
                email: result.email,
                message: result.message
            })
        })
        .catch((error) => {
            console.error('Error retrieving data:', error); 
            res.status(500).send('Error');
        });
});

connectToDb((err) => {
    if (!err) {
        app.listen(8080, () => {
            console.log('Server is running on port 8080');
            db = getDb();
        });
    } else {
        console.log('DB connection error:', err);
    }
})
