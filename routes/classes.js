var express = require('express');
var router = express.Router();

var Class= require('../models/class');
var Instructor=require('../models/instructor');
var User=require('../models/user');
/*classes page . */

router.get('/', function(req, res, next) {
	Class.getClasses(function(err, classes){
        if(err)throw err;
		res.render('classes/index', { classes: classes });
	},5);
});

// classes detail
router.get('/:id/details', function(req, res, next) {
	Class.getClassById([req.params.id],function(err, classname){
	if(err)throw err;
	
		Class.countlikes(req.params.id,function(err,x){
			if(err)throw err;
			var likes=0;
			var dislike=0;
			for (var i = 0; i < x.reactions.length; i++) {
				var currentAccount = x.reactions[i];
			
			   if(currentAccount.emot=="like")
			  	   likes=likes+1;
			   else
				{
					dislike=dislike+1;
			   }
			   console.log(dislike+" :like are");
			}
			Instructor.getInstructorByUsername(classname.instructor,function(err,instructor){
				console.log("---**tatatatat*"+user_object.avater_name+"*tatata-----**");
				user_avatar=user_object.avater_name;

				res.render('classes/details', { class: classname, instructor:instructor, likes: likes,dislike: dislike, user_avatar:user_avatar });
			});
			
		});

		
	});

});

// lessons detail
router.get('/:id/lessons', function(req, res, next) {
	
	
	Class.getClassById([req.params.id],function(err, classname){
        if(err)throw err;
		res.render('classes/lessons', { class: classname });
	});
});

// lessons detail
router.get('/ttt/:id/lesson/:lesson_number', function(req, res, next) {
	Class.getClassById([req.params.id],function(err, classname){
		var lesson;
		if(err)throw err;
		for(i=0;i<classname.lessons.length;i++)
			if(classname.lessons[i].lesson_number==req.params.lesson_number){
				lesson=classname.lessons[i];
			}
		res.render('classes/file', { class: classname ,lesson: lesson});
	});
});




module.exports = router;
