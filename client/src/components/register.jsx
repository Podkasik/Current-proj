import React, {Component} from "react"
import {register} from "./actions/user-func"

class Register extends Component{
    constructor(){
        super()
        this.state = {
            name:'',
            email:'',
            password:'',
            errors:{}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e){
        e.preventDefault()

        const newUser={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }

        register(newUser).then(res=>{
            this.props.history.push(`/login`)
        })
    }

    render(){
        return(
    <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Регистрация</h1>
              <div className="form-group">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Введите имя"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Введите email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Введите пароль"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </div>
        )
    }
}

export default Register