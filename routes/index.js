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
	res.json({bid:'BID_123_XYZ'});
})

router.get('/payment',(req,res) => {
	console.log(req.query);
	deal = deals.filter((deal) => {
		return deal.id === parseInt(req.query.id);
	})[0];
	console.log(deal);
	res.render('payment',{amount:deal.amount});
})

router.get('/register/cust',(req,res) => {
	console.log('New cust: ', req.body);
	res.send('OK');
})

router.get('/addDeal',(req,res) => {
	res.render('addDeal');
})

router.post('/paymentConfirmation',(req,res)=>{
	res.render('paymentConfirmation');
})

router.get('/submitted', (req,res) => {
	res.render('submitted');
})

router.post('/addDeal',(req,res) => {
	deals.push({
		id:deals.length+1,
		desc:req.body.busDesc,
		Location:"Loc " + parseInt(deals[deals.length-1].Location.split(" ")[1]),
		amount:deals[deals.length-1].amount + 100
	})
	console.log(deals);
	res.redirect('/submitted');
})
module.exports = router;
