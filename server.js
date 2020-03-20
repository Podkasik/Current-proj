const mongoose = require('mongoose')
const express = require ('express')
const bodyParser = require("body-parser")
const app  = express()
const UserServ = require('./requests/auth')
const Collection = require('./requests/collectionService')
const path = require('path')
const port = 3000

const mongoURI = "mongodb+srv://User:1q2w3e4r@cluster0-bna48.azure.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err) return console.log(err);
    app.listen(port, () => console.log(`Listening on port ${port}`))
})

app.use(express.static(path.join(__dirname,'./client/build')))
//app.set('view-engine','ejs')
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))
app.use(UserServ, Collection)
