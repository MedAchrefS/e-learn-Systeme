var express = require('express');
var router = express.Router();

var Class= require('../models/class');
var Instructor=require('../models/instructor');

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

router.post('/like_class',function(req,res,next){
	user_id=req.body.user_id;
	class_id=req.body.class_id;

	info=[];
	info['user_id']=user_id;
	info['class_id']=class_id;
		
			 Class.like_class(info,function(err,class_){
				if(err)throw err;
				
				res.redirect('/classes/'+class_id+'/details');
				
			 })
	
	
	
});

module.exports = router;
