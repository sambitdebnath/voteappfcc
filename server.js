//Dependencies
var mongoose=require('mongoose'),
    express=require('express'),
    passport=require('passport'),
    session=require('express-session'),
    routes=require('./app/routes/index'),
    bodyParser=require('body-parser');


require('dotenv').load();
require('./app/config/passport')(passport);
//Configure express to use session    
var app=express();
app.use(session({
  secret:'secretSambit',
  resave:false,
  saveUninitialized:true
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//setting up static paths
app.use('/public',express.static(process.cwd()+"/public"));
app.use('/views',express.static(process.cwd()+"/app/views"));





app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI);
routes(app,passport);

//Listen for connections
app.listen(process.env.PORT||8080,function(){
  console.log("Server Live. Listening for connnections ...");
})