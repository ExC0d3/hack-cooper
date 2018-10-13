var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/location',(req,res) => {

	if(req.body){
		console.log('Got it: ', req.body);

	}
	res.json(req.body);
});

router.get('/register', (req,res) => {
	res.render('register');
})

router.post('/register/business',(req,res) => {
	console.log(req.body);
	res.send(req.body);
})

module.exports = router;
