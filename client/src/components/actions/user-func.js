import axios from "axios"

export const register = newUser =>{
    return axios 
    .post('register',{
        name: newUser.name,
        email:newUser.email,
        password:newUser.password,
    })
    .then(res =>{
        console.log("Registered")
    })
    .catch(err=>{
        console.log(err)
    })
}

export const login = user =>{
    return axios
    .post('/login',{
        email:user.email,
        password:user.password
    })
    .then(res=>{
        if(res.data.error){
            alert('Такого пользователя не существует')
        }
        else{
            localStorage.setItem('usertoken',res.data)
            return res.data
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
/*
export const updateUser = (data) => {
     
    return axios
      .put('update-user', { params: {
        data:data
      }
     
      })
      .then(response => {
        return response.data       
      })
      .catch(err => {
        console.log(err)
      })
  }*/