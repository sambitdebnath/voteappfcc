var mongoose=require('mongoose'),
    User=require('./user').schema;
var Schema = mongoose.Schema;

var Poll=new Schema({
       creator:{type:Schema.Types.ObjectId,ref:'User'},
       timestamp:{type:Date,default:Date.now},
       polltopic:String,
       pollchoices:[{
           choice:String,
           votes:Number
       }],
       voters:[{type:Schema.Types.ObjectId,ref:'User'}]
       
});


module.exports=mongoose.model('Poll',Poll);