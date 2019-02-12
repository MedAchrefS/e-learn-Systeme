var mongoose = require('mongoose');

var ClassSchema= mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    instructor:{
        type:String,
        required: true
    },
    lessons:[
        {
            lesson_number:{ type: Number},
            lesson_title:{type: String,required: true},
            lesson_body:{type: String},
            lesson_file:{type: String}
        }
    ]
})
var Class= module.exports= mongoose.model('Class',ClassSchema);

// Fetch All Classes
module.exports.getClasses = function(callback, limit){
	Class.find(callback);
}

// Fetch searched classes
module.exports.getsearchedClasses = function(searchkey,callback, limit){
    
   var query = { $or : [ { title: { $regex: searchkey } }, {description: { $regex: searchkey } },{ instructor: { $regex: searchkey }  } ] }; 
	Class.find(query,callback);
}

// Fetch Single Class
module.exports.getClassById = function(id, callback){
	Class.findById(id, callback);
}
// create lessons
module.exports.addLesson = function(info, callback){
    class_id=info['class_id'];
    lesson_number=info['lesson_number'];
    lesson_title=info['lesson_title'];
    lesson_body=info['lesson_body'];
    lesson_file=info['lesson_file'];

    Class.findByIdAndUpdate(
        class_id,
        {$push:{"lessons":{ lesson_number:lesson_number,
                            lesson_title:lesson_title,
                            lesson_body:lesson_body,
                            lesson_file:lesson_file } } },
        {safe: true, upsert: true},
        callback
    );
}

// Create Classes


module.exports.saveClass=function(infoclass){
console.log('achref');


        Class.title=infoclass['title'];
        Class.description=infoclass['description'];
        Class.instructor=infoclass['instructor'];
        
        console.log("tttt ;: "+infoclass['instructor']);
        // variable lesson 
        lessons=[];
        lessons['lesson_number']=infoclass['lesson_number'];
        lessons['lesson_title']=infoclass['lesson_title'];
        lessons['lesson_body']=infoclass['lesson_body'];

        console.log(lessons['lesson_number']);
        console.log(lessons['lesson_title']);
        console.log(lessons['lesson_body']);
        // ajouter dans la classe

        var newClass = new Class({
            title: infoclass['title'],
            description:infoclass['description'],
            instructor:infoclass['instructor'],
            lessons:[
                {
                    lesson_number:infoclass['lesson_number'],
                    lesson_title:infoclass['lesson_title'],
                    lesson_body:infoclass['lesson_body']
                }
            ]
            

        });

        newClass.save(function(error){
            console.log("le classe a ete inscrit");
            if(error){
                console.error("ceci est la faute : "+error);
            }
        });
}

module.exports.UpdateClass=function(info, callback){

    console.log(info['id']);
    console.log(info['title']);
    console.log(info['description']);
    Class.findByIdAndUpdate(info['id'],
                        {$set:{title:info['title'],description: info['description'] }}, 
                        function(err, callback){
                            if(err){
                                console.log(err);
                            }
                           
             });

}



