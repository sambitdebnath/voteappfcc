var LocalStrategy = require('passport-local').Strategy,
    User=require('../models/user');
    
module.exports=function(passport){
  //serialize & deserialize
  passport.serializeUser(function(user,done){
      done(null,user.id);
  });
  passport.deserializeUser(function(id,done){
      User.findById(id,function(err,user){
          done(err,user);
      });
  });
  //local signup
  passport.use('local-signup',new LocalStrategy({
      usernameField:'email',
      passwordField:'password',
      passReqToCallback:true
  },
  function(req,email,password,done){
      process.nextTick(function(){
          User.findOne({'local.email':email},function(err,user){
            if (err)
                return done(err);
            if(user){
                return done(null,false,req.flash('signupMsg','User with given email already exists!'));
            } else {
                var newUser=new User();
                newUser.local.email=email;
                newUser.local.password=newUser.generateHash(password);
                newUser.local.displayname=req.body.displayname;
                newUser.save(function(err){
                    if(err) throw err;
                    return done(null,newUser);
                });
            }
          });
      });
  }));
  passport.use('local-login',new LocalStrategy({
      usernameField:'email',
      passwordField:'password',
      passReqToCallback:true
  },
  function(req,email,password,done){
      process.nextTick(function(){
        User
            .findOne({'local.email':email},function(err,user){
                if(err) return done(err);
                if(!user)
                    return done(null,false,req.flash('loginMsg','User with given email doesn\'t exist!'));
                if(!user.isValidPasswd(password))
                    return done(null,false,req.flash('loginMsg','Incorrect password!'));
                return done(null,user);
            });
      });
  }));
};
