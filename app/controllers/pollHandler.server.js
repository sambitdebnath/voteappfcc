var User=require('../models/user');
var Poll=require('../models/poll');
function pollHandler(){
  this.addPoll = function(req,res){
      //console.log(req.body);
      User
        .findOne({'local.id':req.user.local.id},{})
        .exec(function(err,result){
            if(err) throw err;
            var n=1;
            var choices=[];
            while(req.body['choice'+n])
                choices.push({choice:req.body['choice'+n++],votes:0});
            var npoll=new Poll();
            //npoll.timestamp=Date.now;
            npoll.polltopic=req.body.polltopic;
            npoll.pollchoices=choices;
            npoll.creator=result;
            result.polls.push(npoll);
            result.save(function(err){
                if(err) throw err;
            });
            res.json({pid:npoll.id});
            npoll.save(function(err){
              if(err) throw err;
            });
        });
  };
  this.getPoll =function(req,res){
      var pollid=req.params.id;
      Poll
        .findOne({'_id':pollid},{'_id':false})
        .exec(function(err,result){
            if (err) throw err;
            var voted=false;
            if(result.voters.indexOf(req.user.local.id)!=-1)
              voted=true;
            res.json([result,{'voted':voted}]);
        });   
  };
  this.postVote=function(req,res){
    //onsole.log("body post vote"+JSON.stringify(req.body));
    Poll
      .findOne({'_id':req.params.id})
      .exec(function(err,result){
        if(err) throw err;
        var arr=result.pollchoices;
        arr[req.body.vchoice].votes++;
        User.findOne({'local.id':req.user.local.id})
          .exec(function(error,res){
            if(error) throw error;
            result.voters.push(res);
          });
        result.save(function(err){
          if(err) throw err;
          //console.log("what");
          res.json(result);
        });
      });
  };
}
module.exports=pollHandler;