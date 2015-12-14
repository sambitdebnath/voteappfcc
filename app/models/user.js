var mongoose=require('mongoose'),
    bcrypt=require('bcrypt-nodejs');
var schema = mongoose.schema();

var User=new schema({
    local:{
        email:String,
        password:String
    },
    polls:[{
       polltopic:String,
       pollchoices:[{
           choice:String,
           votes:Number
       }]
    }]
});

User.methods.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
User.methods.isValidPasswd=function(password){
    return bcrypt.compareSync(password,this.local.password);
};
module.exports=mongoose.model('User',User);