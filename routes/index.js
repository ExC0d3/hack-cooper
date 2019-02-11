var express = require('express');
var router = express.Router();
let deals = require('./dealData');
const ch = require('chance');
const chance = new ch();
const dash = require('lodash');

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
	if(req.query.new){
		console.log('New deals');
		
		const newDeals = deals.map((deal,idx) => {
			let  t = chance.integer()%10;
			return {
				busName: chance.company(),
				amount: chance.integer({min:300, max:532432}),
				id: deals.length+idx+1,
				Location: chance.coordinates()

			}
		});
		console.log('Sending ', newDeals);
		deals = deals.concat(newDeals);
		res.render('dealDisplay',{deals:newDeals});
	}
	else{
		res.render('dealDisplay',{deals:dash.take(deals,6)});	
	}
	
})

router.get('/register', (req,res) => {
	res.render('register');
})

router.post('/register/business',(req,res) => {
	console.log(req.body);
	res.redirect('/confirmed');
})

router.get('/confirmed',(req,res) => {
	res.render('confirmed');
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

router.get('/user', (req,res) => {
	res.render('user');
})

router.get('/push',(req,res) => {
	res.render('pushPage');
})

module.exports = router;
