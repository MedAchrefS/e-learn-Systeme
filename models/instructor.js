var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
User=require('./user');

Class_i = require('./class');


// Instructor schema
var InstructorSchema= mongoose.Schema({
    first_name: {
        type: String,

    },
    last_name:{
        type:String,
    },
    adresse:[{
        street_address:{type: String},
        city:{type:String},
        state:{type:String},
        zip:{type:String}
    }],
   
    username:{
        type:String
    },
    email:{
        type:String
    },
    classes:[{
        class_id:{type: [mongoose.Schema.Types.ObjectId]},
        class_title: {type: String}
    }],
    gender:{
        type:String
    },
    avater_name:{
        type:String
    }
});

var Instructor= module.exports= mongoose.model('Instructor',InstructorSchema);

module.exports.getInstructorByUsername=function(username, callback){
    var query={username: username};
    Instructor.findOne(query, callback);
}
// classes created by the instructor
module.exports.getInstructorclasses=function(username, callback){
    var query={username: username};
    Instructor.findOne(query);

    var query2={instructor: username};
    Class_i.find(query2,callback);

}

//Register Instructor for a class
module.exports.register=function(info,callback){
    instructor_username= info['instructor_username'];
    class_id=info['class_id'];
    class_title= info['class_title'];
    var query={username: instructor_username};
    Instructor.findOneAndUpdate(
        query,
        {$push:{"classes":{ class_id:class_id, class_title:class_title } } },
        {safe: true, upsert: true},
        callback
    );
}

// manage Instructor function
module.exports.manage=function(info,callback){
    instructor_username= info['instructor_username'];
    email=info['instructor_email'];

    old_user=user_object.username;

    gender=info['gender'];
    avater_name=info['avatar'];
    console.log(instructor_username);
    console.log(email);
    console.log(old_user);
    console.log(gender);
    console.log('////////////////////////');
   
    Instructor.findOneAndUpdate(
        { username: old_user }, { username: instructor_username, gender:gender, email:email, avater_name:avater_name },
        {new: true},
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }else{
                console.log(instructor_username+' !!!!!!!!!!');
                console.log("the update works fine!");
            }}
        
    );

   
    User.findOneAndUpdate(
        { username: old_user }, { username: instructor_username,email:email, gender:gender,avater_name:avater_name },
        {new: true},
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }else{
                console.log(instructor_username+' !!!!!!!!!!');
                console.log("the update works fine!");
            }}
    )

    
}