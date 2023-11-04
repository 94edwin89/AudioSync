const express=require('express')
const path=require('path')
const app=express()
const ejs=require('ejs')
const session=require('express-session')
const {check,validationResult}=require('express-validator')
require('dotenv').config();

const bcrypt=require('bcrypt')


app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))


//initialize express-session middleware
app.use(
    session({
        secret:'your_secret_key',
        resave:false,
        saveUninitialzed:true,
        cookie:{maxAge:1800000},
    })
);

function checkSession(req,res,next){
    
    if(req.session.user){
        // session exists, redirect to the  home page
        return res.render('home')
    }
    // session doesn't exit, priceed with the request
    next();
}



app.get('/',checkSession,(req,res)=>{
    res.render('pages/login')
})

const validateUserInputs=[
    check('username').isAlphanumeric().isLength({min:3}),
    check('password').isLength({min:6}),
    check('email').isEmail(),
]

app.get('/signup',(req,res)=>{
    res.render('pages/signup')
})

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})