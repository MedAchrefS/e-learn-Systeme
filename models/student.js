var mongoose = require('mongoose');

// student schema
var StudentSchema= mongoose.Schema({
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


var Student= module.exports= mongoose.model('Student',StudentSchema);

module.exports.getStudentByUserneme=function(username, callback){
    var query={username: username};
    Student.findOne(query, callback);
}

//Register Instructor for a class
module.exports.register=function(info,callback){
    student_username= info['student_username'];
    class_id=info['class_id'];
    class_title= info['class_title'];
    var query={username: student_username};
     Student.findOneAndUpdate(
        query,
        {$push:{"classes":{ class_id:class_id, class_title:class_title } } },
        {safe: true, upsert: true},
        callback
    );
}


// manage Student function
module.exports.manage=function(info,callback){
    student_username= info['student_username'];
    email=info['student_email'];

    old_user=user_object.username;

    gender=info['gender'];
    avater_name=info['avatar'];
    if (avater_name==null)
    {
       
        Student.findOneAndUpdate(
       
            { username: old_user }, { username: student_username, gender:gender, email:email },
            {new: true},
            (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }else{
                    console.log(student_username+' !!!!!!!!!!');
                    console.log("the update works fine!");
                }}
            
        );
    }
    else{
     
        Student.findOneAndUpdate(
       
            { username: old_user }, { username: student_username, gender:gender, email:email, avater_name:avater_name },
            {new: true},
            (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }else{
                    console.log(student_username+' !!!!!!!!!!');
                    console.log("the update works fine!");
                }}
            
        );
    }
    console.log(student_username);
    console.log(email);
    console.log(old_user);
    console.log(gender);
    console.log('////////////////////////');
   
  

   
    User.findOneAndUpdate(
        { username: old_user }, { username: student_username,email:email },
        {new: true},
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }else{
                console.log(student_username+' !!!!!!!!!!');
                console.log("the update works fine!");
            }}
    )

    
}