var express = require('express');
var router = express.Router();

function getList() {
  return new Promise((resolve) => setTimeout(() => {
    resolve(
      [
        {
          id: 1,
          title: 'Angular 12',
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
  res.render('index', { title: 'Dmitry Sekhno', list: await getList() });
});

module.exports = router;


