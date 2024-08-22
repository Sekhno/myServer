const express = require('express');
const router = express.Router();
const {createItem, readItems, updateItem, deleteItem} = require('../core/crud');

function getList() {
  return new Promise((resolve) => setTimeout(() => {
    resolve(
      [
        {
          id: 1,
          title: 'Angular 17',
          description: 'Изучить фреймворк!'
        },
        {
          id: 2,
          title: 'React',
          description: 'Изучить фреймворк!'
        },
        {
          id: 3,
          title: 'React Native',
          description: 'Изучить фреймворк!'
        }
      ]
    )
  }))
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Internet Shop', list: await getList() });
});

module.exports = router;


