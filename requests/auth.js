const express = require("express")
const jwt = require('jsonwebtoken')
const router = express.Router()
const bcrypt = require('bcrypt')
const cors = require('cors')
const User = require('../models/User')
process.env.SECRET_KEY = 'secret';
router.use(cors())

//загрузка страницы
router.get('', (req,res)=>{
    res.render('../client/src/App')
})

router.post('/register', async (req,res)=>{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
            var newUser =  {
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            dateReg: new Date().toISOString().slice(0,10)
        }        
        User.findOne({
            email: req.body.email
        })
        .then(user=>{
            if(!user){
                User.create(newUser)
                .then(u=>{                  
                    res.json({ status: u.email + ' Registered!' })
                    console.log(u.email)
                })
                .catch(err=>{
                    res.send('error: '+err )
                })
            }else{
                console.log('Не зарегистрирован')
                res.json({ error: 'User already exists' })
            }
        })  
        .catch(err=>{
            res.send('error: ' +err)})
})

router.post('/login', (req,res)=>{    
        User.findOne({email:req.body.email})
            .then(user =>{
                if(user){
                    if(bcrypt.compareSync(req.body.password,user.password)){  
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            dateReg:user.dateReg,
                            role: user.role
                          }
                          let token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 1440
                          })
                          res.send(token)
                    }else{
                        res.json({ error: 'Invalid username or password!!' })
                    }
                }else{
                    res.json({ error: 'Invalid username or password!!' })
                }
            })
            .catch(err=>{
                res.send('error: '+ err)
            })
        }
    )

router.get('/profile', (req, res) => {
        var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)      
        User.findOne({
          _id: decoded._id
        })
          .then(user => {
            if (user) {
              res.json(user)
            } else {
              res.send('User does not exist')
            }
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      })

module.exports = router