var express = require('express');
var router = express.Router();

var Class= require('../models/class');

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
		res.render('classes/details', { class: classname });
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
router.get('/ttt/:id/lesson/:lesson_id', function(req, res, next) {
	Class.getClassById([req.params.id],function(err, classname){
        if(err)throw err;
		res.render('classes/lessons', { class: classname });
	});
	

});


module.exports = router;
