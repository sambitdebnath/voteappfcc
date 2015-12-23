var mongoose=require('mongoose'),
    bcrypt=require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var Poll=require('./poll').schema;
var User=new Schema({
    local:{
        email:String,
        password:String,
        displayname:String
    },
    polls:[{type:Schema.Types.ObjectId,ref:'Poll'}]
});

User.methods.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
User.methods.isValidPasswd=function(password){
    return bcrypt.compareSync(password,this.local.password);
};

var User=mongoose.model('User',User);
//Poll.add({votes:{type:Schema.Types.ObjectId,ref:'User'}});
module.exports=User;