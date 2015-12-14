//Dependencies
var mongoose=require('mongoose'),
    express=require('express'),
    passport=require('passport'),
    session=require('express-session'),
    routes=require('./app/routes/index.js')


require('dotenv').load();

//Configure express to use session    
var app=express();
app.use(session({
  secret:'secretSambit',
  resave:false,
  saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI);
routes(app,passport);

//Listen for connections
app.listen(process.env.PORT||8080,function(){
  console.log("Server Live. Listening for connnections ...");
})