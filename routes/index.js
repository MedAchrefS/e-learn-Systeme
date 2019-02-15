var express = require('express');
var router = express.Router();

var Class= require('../models/class');

/* GET home page. */

router.get('/', function(req, res, next) {
	Class.getClasses(function(err, classes){
		res.render('index', { classes: classes });
	},3);
});


router.get('/games', function(req, res, next) {
	
	res.render('Games/GamesLayout');
});
router.get('/games/snake', function(req, res, next) {
	
		res.render('Games/Snake');
});

router.get('/games/Math', function(req, res, next) {
	
	res.render('Games/Math');
});

router.get('/games/Memory', function(req, res, next) {
	
	res.render('Games/Memory');
});


router.get('/games/worm_cool', function(req, res, next) {
	
	res.render('Games/worm_cool');
});

router.get('/games/math_game', function(req, res, next) {
	
	res.render('Games/math_game');
});


router.post('/search', function(req, res, next) {
	console.log("achrefssssssssssssssssssssssssss");
	searchkey=req.body.searchkey;
	

	Class.getsearchedClasses(searchkey,function(err, classes){
        if(err)throw err;
		res.render('classes/search' ,{ classes: classes });
		
	},10);

});

module.exports = router;
