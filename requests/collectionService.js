const express = require("express")
const router = express.Router()
const Collection = require('../models/Collection')
const cors = require('cors')
router.use(cors())

router.get('/get', (req, res) =>{
    
    const userId = req.query.userId   
    Collection.find({userId:userId}).then((post,err)=>{        
        if (post.length) {
            res.send({out:post})
          } 
          else {
            console.log(err)
            res.send('Такой коллекции не существует')
          }
    })
})

router.get('/getall', (req, res) =>{
  Campaign.find().then((post,err)=>{      
      if (post.length) {
          res.send({out:post})
        } 
        else {
          console.log(err)
          res.send('Такой коллекции не существует')
        }
  })
})

router.post('/post', (req, res) => {
    Collection.create({
       name: req.body.name,
       description: req.body.description,
       subject: req.body.subject,
       image: req.body.image,
       date: new Date().toISOString().slice(0,10),
       userId: req.body.userId,
       userName: req.body.userName,
    },)
    .then((post)=>{
      res.send(post);
        res.json({ status: post + ' Коллекция создана!' });       
    })
    .catch(err => {
        res.send('error: ' + err)
      })
    
})

router.get('/delete', (req, res) =>{
  const collectionId = req.query.collectionId
    Collection.remove({_id: collectionId}, function(err, post){
      if(err) res.json(err)
      else res.json('Успешно удалено')
  })
})
/*
router.put('/update', (req, res) =>{
  const collectionId = req.body.params.data.collectionId
  const money = req.body.params.data.count
 
  Campaign.update({_id: campaignId}, {money: money})
        .then(post =>{
            res.send(post);
        })
        .catch(err => {
          res.send('error: ' + err)
        })
})*/

router.put('/update-collection', (req, res) =>{
    const collectionId = req.body.params.data.collectionId
    Collection.update({_id: collectionId}, 
      {
        name: req.body.params.data.name,
        description: req.body.params.data.description,
        image: req.body.params.data.image  
      })
          .then(post =>{
              res.send(post);
          })
          .catch(err => {
            res.send('error: ' + err)
          })
  })


router.get('/getone', (req, res) =>{

  const collectionId = req.query.collectionId 
  Collection.find({_id:collectionId}).then((post,err)=>{
      
      if (post) {
          res.json(post)
        } 
        else {
          console.log(err)
          res.send('Такой коллекции не существует')
        }
  })
})


module.exports = router;