require("dotenv").config();

const express = require('express');
const app = express();
const db = require('./db/db_configuration');
const bodyParser = require('body-parser');

// console.log(process.env);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

app.get('/dogs', (req,res)=>{
      db.query('SELECT * FROM dogs;', (err,data)=>{
        if(err) {
            console.log(err);
            res.append('Content-Type', 'plain/text');
            res.status(404).send('Something bad happened');
        } else {
            res.json(data.rows);
        }
      });
});

app.post('/dogs', (req,res)=>{
    let dogAttributes = req.body;
    
    console.log(req.body);

    db.query('INSERT INTO dogs (name, breed) VALUES ($1, $2);', [dogAttributes.name,
    dogAttributes.breed], (err,data)=>{
        if(err) {
            console.log(err);
            res.append('Content-Type', 'plain/text');
            res.status(400).send('Oh noes an error has occurred');
        } else {
            res.append('Content-Type', 'application/json');
            res.status(200).send('Congrats your dog has been added!');
        }
    });
});

app.put('/dogs/:dogId', (req,res)=>{
    let {dogId} = req.params;
    let dogAttributes = req.body;

    db.query('UPDATE dogs SET name=$1, breed=$2 WHERE dogId=$3;', [dogAttributes.name,
    dogAttributes.breed, dogId], (err,data)=>{
        if(err) {
            console.log(err);
            res.append('Content-Type', 'application/json');
            res.status(404).send('An error has occurred. No dog was modified.');
        } else {
            res.append('Content-Type', 'application/json');
            res.status(200).send('Congrats your dog has been modified');
        }
    })
});

app.delete('/dogs/:dogId', (req,res)=>{
    const {dogId} = req.params;

    db.query('DELETE from dogs WHERE dogId=$1', [dogId], (err,data)=>{
        if(err) {
            res.append('Content-Type', 'plain/text');
            res.status(400).send('Error. Your dog was not deleted');
        } else {
            res.append('Content-Type', 'plain/text');
            res.status(200).send('Congrats your pooch was deleted');
        }
    });
});



app.listen(process.env.PORT, () => {
    console.log('listening on Port 9000');
});