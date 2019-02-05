var express = require('express');
var router = express.Router();
var path = require('path');
Class =require('../models/class');
Student= require('../models/student');
User=require('../models/user');




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


router.get('/classes',function(req, res,next){
    Student.getStudentByUserneme(req.user.username,function(err,student){
            if(err) throw err;
            res.render('students/classes',{student: student});
    })
});


router.post('/classes/register',function(req,res, next){
    info=[];
    info['student_username']=req.user.username;
    info['class_id']=req.body.class_id;
    info['class_title']=req.body.class_title;
    Student.register(info, function(err, student){
        if(err) throw err;
        console.log(student);
    });
    req.flash('success_msg', 'You are registered to this class');
    res.redirect('/student/classes');
});

router.get('/classes/:id/lessons/new',function(req, res,next){
    res.render('instructor/newlesson',{class_id:req.params.id});
});




// manage Function get
router.get('/manage', function(req, res, next){
	Student.getStudentByUserneme(req.user.username, function(err, student){
		avatar=student.avater_name;
		//const [name_avatar, date_avatar] = avatar.split('-');
		//console.log(name_avatar);
		//console.log(date_avatar);
		//console.log('/////////////////');
        if(err) throw err;
        var male= false;
        var female=false;
        if(student.gender=='male')
         male=true;
         else if(student.gender=='female')
		 female=true;
		res.render('students/ManegeAccount', {student: student,male: male, female: female, avatar: avatar});
	});
});



// manage function post

router.post('/manage',upload.single('avatar'), function(req, res){

	info = [];
	info['student_username'] = req.user.username;
	info['student_email']= req.body.student_email;
    info['gender']=req.body.gender;
    if(req.file) info['avatar']= req.file.filename;
    	

	Student.manage(info, function(err, student){
		if(err) throw err;
		console.log(student);
	});

	req.flash('success_msg', 'Your Modification Hase been Saved');
	res.redirect('/students/classes');
});


module.exports=router;