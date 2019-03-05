var express = require('express');
var router = express.Router();
var path = require('path');
var Class= require('../models/class');
var User=require('../models/user');
var Instructor=require('../models/instructor');
var Student=require('../models/student');
var Specialite=require('../models/specialite');


// Multer files and image consiguration && destination

const multer= require('multer');

const  storage=multer.diskStorage({
	destination:function(req,file,callback){
		callback(null, './public/images/specialite');
	},
	filename: function(req,file,callback){
		callback(null, Date.now()+path.extname(file.originalname));
	}
});
const upload= multer({storage:storage});


router.get('/index', function(req, res, next) {
	Class.getClasses(function(err, classes){
		data = [];
		label=[];
		lenth_t=new Array();
		label=new Array();
		var t=0;
	for (var i = 0; i < classes.length; i++) {
	
		console.log(classes[i].reactions);
		console.log( classes[i].reactions.length+"lengeur du tableu reaction");
		lenth_t[t]=classes[i].reactions.length;
		label[t]=classes[i].title;
		t++;

	
	
	}
	for(x=0;x<lenth_t.length;x++){
		console.log("|"+lenth_t[x]+"|");
	}
	var user_count=0;
	User.countUsers(function(err,users){
		user_count=users.length;

		Instructor.countInstructor(function(err,instructor){
			instructor_count=instructor.length;
			
			Student.countStudent(function(err,student){
				student_count=student.length;

								res.render('Admin/index', {
									layout: false,classes: classes,
									datai: lenth_t,
									labeli: label,
									user_count:user_count,
									instructor_count:instructor_count,
									student_count:student_count
								});
			});

								
		
		});


	});
      
				
	},3);

	
});

router.get('/users',function(req, res, next){
	console.log("achref users lllllllllllllll");
	User.countUsers(function(err,users){


		res.render('Admin/users', {
			layout: false,
			users:users		
		});
	});


	
});
router.get('/specialite',function(req, res, next){
	console.log("achref users lllllllllllllll");
	Specialite.getSpecialite(function(err,specialites){


		res.render('Admin/specialite', {
			layout: false,
			specialites:specialites		
		});
	});


	
});
router.post('/add_specialite',upload.single('image_s'),function(req, res, next){
	
	info = [];
	
	info['name_s'] = req.body.name_s;
	info['image_s']= req.file.filename;
	console.log("name: "+info['name_s']);
	console.log("name:chhhhhhhhhhhhhhhhhhhhhhhhh ");

	 console.log("image: "+info['image_s']);
	 console.log("name:chhhhhhhhhhhhhhhhhhhhhhhhh ");
	Specialite.add_specialite(info,function(err,specialite){
		res.redirect('/admin/specialite');
	}); 
	res.redirect('/admin/specialite');



	
});
router.get('/edit_specialite/:id',function(req,res,next){
	
	Specialite.getSpecialiteById(req.params.id,function(err, specialite){
		
		id_s=specialite._id;
		nom_specialite=specialite.nom_specialite;
		image_spec=specialite.image_spec;
		console.log("id /////////////////////////");
		console.log("id "+id_s);
		console.log("id /////////////////////////");
		console.log("nom_specialite "+nom_specialite);
		console.log("image "+image_spec)
	});

	res.render('Admin/edit_specialite', {
		layout: false,
		id_s:id_s,
		nom_specialite:nom_specialite,
		image_spec:image_spec	
	});
});


router.post('/edit_specialite/:id',upload.single('image_spec'),function(req,res,next){
	console.log("edit id specialite"+req.params.id);
	console.log("edit nom post: "+req.body.nom_specialite);
	console.log("edit image post: "+req.file.filename);
	info=[];
	info['id']=req.params.id;
	info['nom_specialite']=req.body.nom_specialite;
	info['image_spec']=req.file.filename;

	Specialite.edit_specialite(info,function(err,specialite){
		res.redirect('/admin/specialite');
	}); 
	res.redirect('/admin/specialite');
});

router.get('/delete_specialite/:id',function(req,res,next){
	console.log("delete id specialite"+req.params.id);
	
	Specialite.delete_specialite(req.params.id,function(err,specialite){
		res.redirect('/admin/specialite');
	});
	res.redirect('/admin/specialite');
});

module.exports = router;