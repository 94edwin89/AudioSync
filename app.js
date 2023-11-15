const express=require('express')
const app=express()
const ejs=require('ejs')
const nodemailer=require('nodemailer')
const session=require('express-session')
const path=require('path')



app.use(express.json())
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.set('views', path.join(__dirname, './views')); 

app.use(express.urlencoded({extended:false}))


// Initialize express-session middleware
app.use(
    session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: true,
      cookie:{maxAge:18},//30 minutes in milliseconds
    })
  );
  
  function checkSession(req,res,next){
    if(req.session.user){
      //session exists, redirect to the home page
      return res.render('index');
    }
    //session doesn't exit, proceed with the request
    next();
  }
  
  app.get('/', checkSession, (req, res) => {
    res.render('user/partials/login'); 
  });
  

  app.get('/signup',(req,res)=>{
    res.render('user/partials/signup')
  })


const PORT=process.env.PORT||4000;


  app.listen(PORT,(err)=>{
   if (err){
    console.log('Error starting Eroor'+err)
   }else{
    console.log(`Server is running on http://localhost:${PORT}`)
   }
  })