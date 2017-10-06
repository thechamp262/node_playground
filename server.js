const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use(function(req,res,next){
  let now = new Date().toString();
  let log = `${now}: ${req.method} - ${req.url}`;
  console.log();
  fs.appendFile('server.log', log + '\n',function(e){
    if(e){
      console.log('Unable to append to server!')
    }
  })
  next();
});
app.use(function(req,res){
  res.render('maintenance.hbs',{
    pageTitle: 'We\'ll Be Back',
    welcomeMessage:'Sorry, the website is currently under maintenance. Check again later'
  })
});
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', function(){
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',function(text){
  return text.toUpperCase();
})
app.get('/',function(req,res){
//  res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Homepage',
    welcomeMessage: 'Welcome to the homepage!'
  })
});
app.get('/about',function(req,res){
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
})

app.get('/bad',function(req,res){
  res.send({
    errorMessage:'Woops, Something went wrong!',
    errorCode: 404
  })
})
app.listen(3000,function(){
  console.log('Server is up on port 3000');
});
