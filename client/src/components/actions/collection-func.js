import axios from 'axios'
import { json } from 'body-parser'


export const create = newCollection => {
      return axios
        .post('post', {
          name: newCollection.name,
          description: newCollection.description,
          bonuses: newCollection.bonuses,
          subject: newCollection.subject,
          image: newCollection.image,
          date: newCollection.date,
          userId: newCollection.userId,
          userName: newCollection.userName
        })
        .then(response => {         
          return response.data
        })
        .catch(err => {
          console.log(err)
        })
  }

export const getCollection = async (userId) => {
    let myVar = []
    await axios
      .get('get', { params: {
        userId:userId
      }
      })
      .then(response => {
        myVar = response
        //return response.data     
      })
      .catch(err => {
        console.log(err)
      })
      //console.log(`myVar = ${myVar}`)
      return myVar
  }

export const getAllCollections = async () => {
   let arr=[]
   await axios
      .get('getall')
      .then(response => {
        arr=response     
      })
      .catch(err => {
        console.log(err)      
      })
      return arr
  }

export const deleteCollection = collectionId => {
    return axios
      .get('delete', { params: {
        collectionId:collectionId
      }
      })
      .then(response => {
        return response.data       
      })
      .catch(err => {
        console.log(err)
      })
  }

export const getOneCollection = collectionId => {
    return axios
      .get('getone', { params: {
        collectionId:collectionId
      }})
      .then(response => {
        return response.data       
      })
      .catch(err => {
        console.log(err)
      })
  }

export const updateCollection = (data) => {   
  return axios
    .put('update-collection', { params: {
      data:data
    } 
    })
    .then(response => {
      return response.data
      
    })
    .catch(err => {
      console.log(err)
    })
}