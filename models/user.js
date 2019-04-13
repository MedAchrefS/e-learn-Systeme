var mongoose = require('mongoose');
var bcrypt= require('bcryptjs');
var moment = require('moment');
// user schema
var UserSchema= mongoose.Schema({
    username: {
        type: String,

    },
    email:{
        type:String,
    },
    password:{
        type:String,
        bcrypt:true,
    },
    user:{
        type:String
    },
    gender:{
        type:String
    },
    avater_name:{
        type:String
    },
    last_login:{
        type:String
    },
    last_logout:{
        type:String
    }
});

var User= module.exports=mongoose.model('User',UserSchema);

// get single User by Id Function
module.exports.getUserById=function(id,callback){
    User.findById(id,callback);
}

// compare Password
module.exports.comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) throw err;
        callback(null,isMatch);
    });
}

// get User by UserName
module.exports.getUserByUsername=function(username,callback){
    var query={username:username};
    User.findOne(query,callback);
}

// Create Student User
module.exports.saveStudent=function(newUser,newStudent,callback){
    bcrypt.hash(newUser.password,10,function(err,hash){
        if(err) throw err
        newUser.password=hash;
        console.log('student is being Saved');
        newUser=newUser.save();
        newStudent=newStudent.save();
    

    });
}

// create Instructor User
module.exports.saveInstructor=function(newUser,newInstructor,callback){
    bcrypt.hash(newUser.password,10,function(err,hash){
        if(err) throw err
        newUser.password=hash;
        console.log('student is being Saved');
        newUser=newUser.save();
        newInstructor=newInstructor.save();
        //async.parallel([newUser,newInstructor],callback);
       
    });
}

module.exports.countUsers=function(callback){
    User.find({}, callback);
}

module.exports.last_login=function(username,callback){
    var query={username:username};
    toda=moment().format("MM ddd, YYYY hh:mm:ss a");
    User.findOneAndUpdate(query, { last_login: toda }, callback);

}
module.exports.last_logout=function(username,callback){
    var query={username:username};
    toda=moment().format("MM ddd, YYYY hh:mm:ss a");
    User.findOneAndUpdate(query, { last_logout: toda }, callback);

}

