var express = require('express');
var router = express.Router();
var path = require('path');
Class = require('../models/class');
Instructor = require('../models/instructor');
User = require('../models/user');

// Multer files and image consiguration && destination

const multer= require('multer');

// generate string

var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 16; i++)
	text += possible.charAt(Math.floor(Math.random() * possible.length));
	text+="-"+ Date.now();

const  storage=multer.diskStorage({
	destination:function(req,file,callback){
		callback(null, './public/images/avatars');
	},
	filename: function(req,file,callback){
		callback(null, user_object.username+ '-' + Date.now()+path.extname(file.originalname));
	}
});
const file_storage=multer.diskStorage({
	destination:function(req,file,callback){
		callback(null, './public/files/lessons');
	},
	filename: function(req,file,callback){
		callback(null, text + path.extname(file.originalname));
	}
});
const upload= multer({storage:storage});
const upload_file= multer({storage:file_storage});

router.get('/classes', function(req, res, next){
	Instructor.getInstructorByUsername(req.user.username, function(err, instructor){
		if(err) throw err;
		res.render('instructor/classes', {instructor: instructor});
	});
});

router.post('/classes/register', function(req, res){
	info = [];
	info['instructor_username'] = req.user.username;
	info['class_id'] = req.body.class_id;
	info['class_title'] = req.body.class_title;

	Instructor.register(info, function(err, instructor){
		if(err) throw err;
		console.log(instructor);
	});

	req.flash('success_msg', 'You are now registered to teach this class');
	res.redirect('/instructors/classes');
});

// nouveau lesson GET Runder function
router.get('/classes/:id/lessons/new', function(req, res, next){
	res.render('instructor/newlesson',{class_id:req.params.id});
});

	// nouveau lesson post function
router.post('/classes/:id/lessons/new',upload_file.single('lesson_file'), function(req, res, next){
	// Get Values
	var info = [];
	info['class_id'] = req.params.id;
	info['lesson_number'] = req.body.lesson_number;
	info['lesson_title'] = req.body.lesson_title;
	info['lesson_body'] = req.body.lesson_body;
	info['lesson_file']=text;

	console.log('************');
	console.log(info['lesson_number']);
	console.log(info['lesson_title']);
	console.log(text);
	console.log('************');


	
	

	Class.addLesson(info, function(err, lesson){
		console.log('Lesson Added..');
	});

	req.flash('success_msg','Lesson Added');
	res.redirect('/instructors/classes');

});


// manage Function get
router.get('/manage', function(req, res, next){
	Instructor.getInstructorByUsername(req.user.username, function(err, instructor){
		avatar=instructor.avater_name;
		//const [name_avatar, date_avatar] = avatar.split('-');
		//console.log(name_avatar);
		//console.log(date_avatar);
		//console.log('/////////////////');
        if(err) throw err;
        var male= false;
        var female=false;
        if(instructor.gender=='male')
         male=true;
         else if(instructor.gender=='female')
		 female=true;
		res.render('instructor/ManegeAccount', {instructor: instructor,male: male, female: female, avatar: avatar});
	});
});

// manage function post

router.post('/manage',upload.single('avatar'), function(req, res){
	console.log(req.file);
	info = [];
	info['instructor_username'] = req.body.instructor_username;
	info['instructor_email']= req.body.instructor_email;
	info['gender']=req.body.gender;
	info['avatar']= req.file.filename;
	console.log(req.file.filename);
	
	console.log('////////////////////0');
	

	Instructor.manage(info, function(err, instructor){
		if(err) throw err;
		console.log(instructor);
	});

	req.flash('success_msg', 'Your Modification Hase been Saved');
	res.redirect('/instructors/classes');
});



module.exports = router;