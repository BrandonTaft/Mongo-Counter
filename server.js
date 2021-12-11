const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
require('dotenv').config()

// serve files from the public directory
app.use(express.static('public'));

//***********CONNECT TO DATABASE****************

const url = process.env.DATABASE_URL;

MongoClient.connect(url, {
    useUnifiedTopology: true
  })
    .then(client => {
      console.log('Connected to Database')
      const db = client.db('Practice')
      const counters = db.collection('counter')

      // add a document to the DB collection recording the click event
app.post('/clicked', (req, res) => {
    const click = {clickTime: new Date()};
    console.log(click);
    console.log(db);

    counters.insertOne(click, (err, result) => {
        if (err) {
          return console.log(err);
        }
        console.log('click added to db');
        res.sendStatus(201);
      });
    });
    
// get the click data from the database
app.get('/clicks', (req, res) => {

    counters.find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });
  
      
  app.listen(3001, () => {
    console.log('listening on 8080');
  });
}); 


// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


