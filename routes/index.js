var express = require('express');
const passport = require('passport');
var router = express.Router();
const localStrategy = require("passport-local");
const userModel =require('./users')
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile',  function(req, res, next) {
  res.send('welcome to profile');
});

router.post('/register',function(req,res){
  var userdata = new userModel({
    username:req.body.username,
    password:req.body.password,
    secret:req.body.secret
  })
  userModel.register(userdata,req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile')
    })
  })
})


router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}),function(req,res){
  res.send("redirect values")
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/")
}



router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect('/')
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/")
}


module.exports = router;
