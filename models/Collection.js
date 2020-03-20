const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CollectionSchema = new Schema({
    userId: {
        type:String,
        reguired: true
    },
    userName:{
        type: String,
        reauired: true
    },
    name:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    subject: {
        type: String      
    },
    date:{
        type: String
    },
    image: {
        type: String //add link to image
    },
    settings:{
        num1:{
            type: Number        
        },
        num2:{
            type: Number        
        },
        num3:{
            type: Number        
        },
        str1:{
            type: String        
        },
        str2:{
            type: String        
        },
        str3:{
            type: String        
        },
        date1:{
            type: Date        
        },
        date2:{
            type: Date        
        },
        date3:{
            type: Date        
        },
        bool1:{
            type: Boolean        
        },
        bool2:{
            type: Boolean        
        },
        bool3:{
            type: Boolean        
        }
    }  
})

const Collection = mongoose.model("collection", CollectionSchema)
 
module.exports = Collection