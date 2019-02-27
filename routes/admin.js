var express = require('express');
var router = express.Router();

var Class= require('../models/class');

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
      
		res.render('admin', {
			layout: false,classes: classes,
			datai: lenth_t,
			labeli: label
		});
	},3);

	
});


module.exports = router;