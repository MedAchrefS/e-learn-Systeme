var express = require('express');
var router = express.Router();

var Class= require('../models/class');
var Instructor=require('../models/instructor');
var User=require('../models/user');
var Specialite=require('../models/specialite');
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
			console.log("le x== "+x);
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
			var user_avatar;
				if (typeof user_object == "undefined") {
					user_avatar=null;
				}
				else if(user_object==null){
					user_avatar==null;
				}else{
					user_avatar=user_object.avater_name;
				}
			console.log(classname.specialite[0].specialite_id+" le id du speciiii");
			var array = classname.specialite[0].specialite_id.split(',');
			
			console.log("///////////////////////");
		var tab_spec_nom=[];
		c=0;
				array.forEach(element => {
					console.log(element);
					Specialite.getSpecialiteById(element,function(err,specialite){
						console.log("///////////////////////");
						console.log("///////////////////////");
						console.log(specialite);
						console.log("///////////////////////");
						console.log("///////////////////////");
						tab_spec_nom[c]=specialite;
						
						c++;
					});
				});
			
					
			
			res.render('classes/details', { class: classname,
				instructor:instructor, likes: likes,dislike: dislike,
				user_avatar:user_avatar, specialite:tab_spec_nom});

	
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
			
			if(user_object.user=="instructor"){
				console.log("@@@@@@@@@@@@@@@@@@");
				console.log(instructor_object.classes);
				console.log("achref rrr");
				Instructor.LastViewedLesson(instructor_object._id,req.params.lesson_number,
					classname._id,classname.title	
					,function(err,lesson){
					console.log("updated Instructor"+lesson);
				});
			}
		/* 	if(user_object.user.trim() =="instructor"){
				Instructor.LastViewedLesson(user_object._id,classname._id,function(){
						console.log(user_object._id+"id user @@@@");
						console.log(classname._id+"id Class @@@@");
						res.render('classes/file', { class: classname ,lesson: lesson});
					});
			} */

	
	});
});




module.exports = router;
