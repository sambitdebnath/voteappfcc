//Dependencies
var mongoose=require('mongoose'),
    express=require('express'),
    passport=require('passport'),
    session=require('express-session'),
    routes=require('./app/routes/index'),
    bodyParser=require('body-parser'),
    flash=require('connect-flash');
require('dotenv').load();
mongoose.connect(process.env.MONGO_URI);

require('./app/config/passport')(passport);
//Configure express to use session    
var app=express();
app.use(session({
  secret:'secretSambit',
  resave:false,
  saveUninitialized:true
}));
app.use(flash());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//setting up static paths
app.use('/public',express.static(process.cwd()+"/public"));
app.set('views',__dirname+"/app/views");
app.use('/controllers',express.static(process.cwd()+'/app/controllers'));
app.set('view engine','ejs');




app.use(passport.initialize());
app.use(passport.session());


routes(app,passport);

//Listen for connections
app.listen(process.env.PORT||8080,function(){
  console.log("Server Live. Listening for connnections ...");
});