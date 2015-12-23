module.exports=function(app,passport){
  function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }
  var ph=require(process.cwd()+'/app/controllers/pollHandler.server.js');  
  var pollHandler=new ph();
  
  app.route('/')
    .get(function(req,res){
        res.render('index.ejs',{message:req.flash('loginMsg')});
    })
    .post(passport.authenticate('local-login',{
      successRedirect:"/home",
      failureRedirect:"/"
    }));
  app.route('/signup')
    .post(passport.authenticate('local-signup',{
        successRedirect:"/home",
        failureRedirect:"/signup"
    }))
    .get(function(req,res){
        res.render('signup.ejs',{message:req.flash('signupMsg')});
    });
  app.route('/home')
    .get(isLoggedIn,function(req,res){
        res.render('home.ejs');
    })
    .post(isLoggedIn,pollHandler.addPoll);
  
  app.route('/api/:id')
    .get(isLoggedIn,function(req,res){
      res.json(req.user.local);
    });
  
  app.route('/login')
    .post(passport.authenticate('local-login',{
      successRedirect:"/home",
      failureRedirect:"/"
    }));
  
  app.route('/logout')
    .get(function(req,res){
      req.logout();
      res.redirect('/');
    });
  app.route('/api/polls/:id')
    .get(isLoggedIn,pollHandler.getPoll);
    
};