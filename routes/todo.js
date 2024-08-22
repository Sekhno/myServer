const express = require('express');
const {readItems, createItem, updateItem, deleteItem} = require("../core/crud");
const {insertItem, fetchAllDocuments} = require("../core/mongodb");
const router = express.Router();

const path = require('path');
const fs = require('fs');


/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.render('todo', {title: 'To Do', items: await getItems()});
});

router.get('/audio', (req, res) => {
  const file = path.join(__dirname, '../storage/audio/test.mp3');

  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send('Audio file not found');
      return;
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    const stream = fs.createReadStream(file);
    stream.pipe(res);
  });

});

function  getItems() {
  return new Promise((resolve, reject) => {
    readItems((err, rows) => {
      if (err) {
        reject(err.message)
      }
      else {
        resolve(rows)
      }
    });
  })
}

router.get('/items', (req, res) => {
  readItems((err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    }
    else {
      res.status(200).json(rows);
    }
  });
});

router.post('/items', (req, res) => {
  const {name, description, image} = req.body;
  createItem(name, description, image,  (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    }
    else {
      res.status(201).send('Item is added');
    }
  });
});

router.put('/items/:id', (req, res) => {
  const {name, description, image} = req.body;

  updateItem(req.params.id, name, description, image, (err) => {
    if (err) {
      res.status(500).send(err.message);
    }
    else {
      res.status(200).send('Item is updated');
    }
  })
});

router.delete('/items/:id', (req, res) => {
  const {id} = req.params;
  deleteItem(id, (err) => {
    if (err) {
      res.status(500).send(err.message);
    }
    else {
      res.status(200).send('Item is deleted');
    }
  })
})

module.exports = router;
