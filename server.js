if(process.env.NODE_ENV == 'production'){
    require('dotenv').config()
}

const mongoClient = require('mongodb').MongoClient
const express = require ('express')
const app  = express()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
var bodyParser = require('body-parser')

const mongoURI = "mongodb+srv://User:1q2w3e4r@cluster0-bna48.azure.mongodb.net/test?retryWrites=true&w=majority"

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email=>users.find(user=>user.email === email),
    id => users.find(user=>user.id === id)
)
let users = []
let curUser
function ShowAll(){
    mongoClient.connect(mongoURI,{ useNewUrlParser:true,useUnifiedTopology: true } ,function(err,db){
    if (err) throw err
    var dbo = db.db('Authorization')
    dbo.collection('Users').find().toArray(function(err, result){
        if (err) throw err 
        users = []
        users = result.map(v=>v)
        return result
    })  
})}
ShowAll()

app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/',checkAuthenticated,(req,res)=>{  
    curUser=req.user 
    async function fnc(v){
        await mongoClient.connect(mongoURI,{ useNewUrlParser:true,useUnifiedTopology: true } ,function(err,db){
        if (err) throw err
        var dbo = db.db('Authorization')
        var today = new Date().toISOString().slice(0,10)
        dbo.collection('Users').updateOne({id:v.id},{$set:{lastDate: today, status:'не заблокирован'}})
        v.lastDate = today
        v.status = 'не заблокирован'
        })
    }
    fnc(req.user) 
    ShowAll() 
    if(req.user.status=='заблокирован'){
 
        req.logOut()
        res.redirect('/login') 

    } else{
    res.render('../client/index.ejs',{usersArr:users,userSel:req.user})
    }

})
app.get('/login',checkNotAuthenticated, (req,res)=>{
    
    res.render('../client/login.ejs')
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req,res)=>{
    res.render('../client/register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
           var newUser =  {
            id: Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            dateReg: new Date().toISOString().slice(0,10),
            lastDate: 'не был в сети',
            status: 'не заблокирован'
        }
        users.push(newUser)
        mongoClient.connect(mongoURI,{ useNewUrlParser:true,useUnifiedTopology: true } ,function(err,db){
            if (err) throw err
            var dbo = db.db('Authorization')
            dbo.collection('Users').insertOne({id:newUser.id,name:newUser.name,email:newUser.email,password:newUser.password,dateReg:newUser.dateReg,lastDate:newUser.lastDate,status:newUser.status})
        })
        res.redirect('/login')

    }catch{
        res.redirect('/register')
    }
})

app.post('/',(req,res)=>{
    let ids =[]
    if (req.body.action == "block" ){
        ids = req.body.blocked.split(',')
        for(i=0;i<ids.length;i++){
             for (j=0;j<users.length;j++){               
                if(ids[i]==users[j].id){
                    async function fnc(v){
                await mongoClient.connect(mongoURI,{ useNewUrlParser:true,useUnifiedTopology: true }, function(err,db){
                    if (err) {throw err}
                    else{
                    var dbo = db.db('Authorization')
                    dbo.collection('Users').updateOne({id:v},{$set:{status:'заблокирован'}},e=>e)   }                   
                    ShowAll()
                    console.log('Успешно заблокирован') 
                 })
                }
                fnc(ids[i])               
                try{
                    if(ids[i]==curUser.id){
                        req.logOut()
                        res.redirect('/login')
                    }
                    else { res.redirect('/')}
                } catch{
                    res.redirect('/')
                }                                             
                break
             }
         }       
    }
}
    if(req.body.action=="unblock"){
        ids = req.body.unblocked.split(',')
        for(i=0;i<ids.length;i++){
             for (j=0;j<users.length;j++){
                 if(ids[i]==users[j].id){
                 async function fnc(v){
                 
                    await mongoClient.connect(mongoURI,{ useNewUrlParser:true,useUnifiedTopology: true }, function(err,db){
                     if (err) throw err
                     var dbo = db.db('Authorization')
                     dbo.collection('Users').updateOne({id:v},{$set:{status:'не заблокирован'}})
                     ShowAll()
                     console.log('Успешно разблокирован')
                 })
                }
                 fnc(ids[i])
                 break
                 }
             }
         }
         res.redirect('/')        
    }
    if(req.body.action=="delete"){             
    ids = req.body.deleted.split(',')
    for(i=0;i<ids.length;i++){
        for (j=0;j<users.length;j++){
            if(ids[i]==users[j].id){
                async function fnc(v){
                    await mongoClient.connect(mongoURI,{ useNewUrlParser:true,useUnifiedTopology: true }, function(err,db){
                        if (err) { 
                            throw err    
                            } else {
                            var dbo = db.db('Authorization')
                            dbo.collection('Users').deleteOne({id:v}) 
                        }
                        ShowAll()                                                                
                    })
                }
                fnc(ids[i]) 
                try{
                    if(ids[i]==curUser.id){
                        req.logOut()
                        res.redirect('/login')
                    }
                    else { res.redirect('/')}
                } catch{
                    res.redirect('/')
                }                                             
                break
            }
            
        }
    }       
    }
})

app.get('/index',(req,res)=>{
    //let newArr = []
    for (var i=0;i<users.length;i++){
        if(req.body.users[i].id.checked){
            //newArr.push(users[i])
            console.log(users[i].id)
            mongoClient.connect(mongoURI,{ useNewUrlParser:true,useUnifiedTopology: true } ,function(err,db){
                if (err) throw err 
                var dbo = db.db('Authorization')
                dbo.collection('Users').remove({id:users[i].id})
                
            })
        }
    }
    res.render('/')
})

app.delete('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

app.listen(3000)
