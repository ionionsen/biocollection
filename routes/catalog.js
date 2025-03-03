var express = require('express');
var router = express.Router();

// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('catalog');
  // console.log('LOGGED');
  // res.send('Birds home page');
});

router.get('/strain/:id', function(req,res){
  res.render('filters', { title: req.params.id });
  // res.send("filters")
})


module.exports = router;
