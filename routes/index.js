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
router.get('/games/quizMath', function(req, res, next) {
	
	res.render('Games/quizMath');
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
	console.log(user_id+"yyyyyyyyyyyyyyyyyyyy");
	class_id=req.body.class_id;

	info=[];
	info['user_id']=user_id;
	info['class_id']=class_id;
		Class.if_user_like_class(info,function(err,user_){
			if(err)throw err;
			console.log("//////////////////////");
			console.log(user_);
			console.log("//////////////////////");
			user_react=false;
			for (var i = 0; i < user_.length; i++) {
					for(var j=0; j<user_[i].reactions.length;j++){
							if(user_[i].reactions[j].user_id==info['user_id']){
								user_react=true;
							}
					}
			}
			console.log("//////////////////////");
				if(user_react==false)
				{
					Class.like_class_new(info,function(err,class_){
						if(err)throw err;
				
					});
					res.redirect('/classes/'+class_id+'/details');
				}
				else{
					Class.like_class(info,function(err,class_){
						if(err)throw err;
				
					});
					res.redirect('/classes/'+class_id+'/details');
				}
			
			
			
		});

			
	
	
});
router.post('/dislike_class',function(req,res,next){
	user_id=req.body.user_id;
	console.log(user_id+"yyyyyyyyyyyyyyyyyyyy");
	class_id=req.body.class_id;
	info=[];
	info['user_id']=user_id;
	info['class_id']=class_id;
	Class.if_user_like_class(info,function(err,user_){
		if(err)throw err;
				
		user_react=false;
		for (var i = 0; i < user_.length; i++) {
				for(var j=0; j<user_[i].reactions.length;j++){
						if(user_[i].reactions[j].user_id==info['user_id']){
							user_react=true;
						}
				}
		}
					if(user_react==false)
					{
						Class.dislike_class_new(info,function(err,class_){
							if(err) throw err;
						});
						res.redirect('/classes/'+class_id+'/details');

					}else{
						Class.dislike_class(info,function(err,class_){
							if(err)throw err;
					
						});
						res.redirect('/classes/'+class_id+'/details');
	
					}
				});
				
	});
router.post('/comment_class',function(req,res,next){
	commentaire=req.body.comment_txt;
	user_id=req.body.user_id;
	class_id=req.body.class_id;
	
	date=Date.now();
	
	info=[];
	info['user_id']=user_id;
	info['class_id']=class_id;
	info['commentaire']=commentaire;
	info['date_commentaire']=date;
	info['user_avatar']=user_object.avater_name;

	Class.commentaire_class(info,function(err,class_){
		if(err)throw err;
	});
	res.redirect('/classes/'+class_id+'/details'); 
});

module.exports = router;
