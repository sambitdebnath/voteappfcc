module.exports=function(app,passport){
  function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }
  
  app.route('/')
    .get(function(req,res){
        res.sendFile(process.cwd()+"/public/index.html");
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
        res.sendFile(process.cwd()+'/public/signup.html');
    });
  app.route('/home')
    .get(isLoggedIn,function(req,res){
        res.sendFile(process.cwd()+'/public/home.html');
    });
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
    })
};