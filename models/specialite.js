var mongoose = require('mongoose');

// user schema
var SpecialiteSchema= mongoose.Schema({
    nom_specialite: {
        type: String,

    },
    image_spec:{
        type:String
    }
});

var Specialite= module.exports=mongoose.model('Specialite',SpecialiteSchema);

// get single User by Id Function
module.exports.getSpecialiteById=function(id,callback){
    Specialite.findById(id,callback);
}



// get User by nom_specialite
module.exports.getSpecialiteByUsername=function(nom_specialite,callback){
    var query={nom_specialite:nom_specialite};
    Specialite.findOne(query,callback);
}

// Fetch All specialite
module.exports.getSpecialite = function(callback, limit){
	Specialite.find(callback);
}


// Create Specialite


module.exports.add_specialite=function(info){
    nom_specialite= info['name_s'];
    image_spec=info['image_s'];     
    console.log("name: "+nom_specialite);
    console.log("image: "+image_spec);
    
            // ajouter dans la classe
            var newSpecialite = new Specialite({
                nom_specialite: nom_specialite,
                image_spec:image_spec
            });
            newSpecialite.save(function(error){
                console.log("le specialite a ete cree");
                if(error){
                    console.error("ceci est la faute : "+error);
                }
            });
    }
module.exports.edit_specialite=function(info){
    id_s=info['id'];
    Specialite.findByIdAndUpdate(id_s,
    {$set:
        {
            nom_specialite:info['nom_specialite'],
            image_spec: info['image_spec'] 
        }
    }, 
    function(err, callback){
        if(err){
            console.log(err);
        }            
});
}   
module.exports.delete_specialite=function(info_id){
    id=info_id;
    Specialite.findByIdAndRemove(id, 
        function(err, callback){
        if(err){
            console.log(err);
        }            
});
} 




