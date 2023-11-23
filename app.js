const express=require('express')
const app=express()
const ejs=require('ejs')
const nodemailer=require('nodemailer')
const session=require('express-session')
const path=require('path')
const dotenv=require ('dotenv')

//configuring .env
dotenv.config({path:'config.env'});

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
      cookie:{secure:false},
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
  

  // default route 

  app.get('/', checkSession, (req, res) => {
    res.render('user/partials/login',
    {documentTitle:'User Login | AudioSync',
  session:null
}); 

  });
  
// signup route

  app.get('/signup',(req,res)=>{
    res.render('user/partials/signup',
    {documentTitle:'User SignUp | AudioSync',
  session:null})
  })

  




const PORT=process.env.PORT||4000;


  app.listen(PORT,(err)=>{
   if (err){
    console.log('Error starting Eroor'+err)
   }else{
    console.log(`Server is running on http://localhost:${PORT}`)
   }
  })