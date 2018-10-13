var express = require('express');
var router = express.Router();
const deals = require('./dealData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/location',(req,res) => {

	if(req.body){
		console.log('Got it: ', req.body);

	}
	res.json({url:'showDeals'});
	
});

router.get('/showDeals', (req,res) => {
	res.render('dealDisplay',{deals});
})

router.get('/register', (req,res) => {
	res.render('register');
})

router.post('/register/business',(req,res) => {
	console.log(req.body);
	res.send('OK');
})

router.get('/payment',(req,res) => {
	res.render('payment');
})

router.get('/register/cust',(req,res) => {
	console.log('New cust: ', req.body);
	res.send('OK');
})

module.exports = router;
