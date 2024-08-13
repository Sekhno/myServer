const express = require('express');
const {readItems, createItem, updateItem, deleteItem} = require("../core/crud");
const {insertItem, fetchAllDocuments} = require("../core/mongodb");
const router = express.Router();


//Виклик функції для вставки даних
// const itemName = 'Sample Item';
// const itemDescription = 'This is a sample description';
// const itemImage = 'base';
// insertItem(itemName, itemDescription, itemImage).then(() => {
//   console.log('insert Item Complete')
// });
//
// setTimeout(() => {
//   fetchAllDocuments().then((documents) => {
//     console.log(documents);
//   })
//
// }, 5000);



/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.render('todo', {title: 'To Do', items: await getItems()});
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
