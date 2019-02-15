var express = require('express');
var router = express.Router();

var Class= require('../models/class');
var Instructor=require('../models/instructor');
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
		Instructor.getInstructorByUsername(classname.instructor,function(err,instructor){
			
			res.render('classes/details', { class: classname, instructor:instructor });
		})
		
		
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
