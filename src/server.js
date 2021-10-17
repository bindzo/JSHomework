const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('../utils/db');
const storeToDB = require('./storeToDB');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const getAllCharFromDB = async (req,res) => {
  const data = await db.callQuery('SELECT * FROM `character`');
  res.send(data);
};

const addChar = async (req,res) => {
  try {
    const {body} =req;
    const {name, gender, location_dimension, location_type} = body;

    const data = await db.callQuery('INSERT INTO `character` set ?',
      {name, gender, location_dimension, location_type, num_episodes: 0});
    res.status(201).send(data);
  } catch(e) {
    res.status(500).send(e.message);
  }
};

const delChar = async (req,res) => {
  try {
    const {body} =req;
    const {id} = body;

    const data = await db.callQuery('DELETE FROM `character` WHERE id = ' + id);
    res.status(201).send(data);
  } catch(e) {
    res.status(500).send(e.message);
  }
};
app.get('/store', storeToDB);
app.get('/character', getAllCharFromDB);

app.post('/character', addChar);
app.delete('/character', delChar);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

module.exports = {
  delChar,
  addChar,
  getAllCharFromDB
};