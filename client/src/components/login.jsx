import React, { Component } from 'react'
import { login } from './actions/user-func'

class Login extends Component {
  constructor() {
    super()
    this.state = { 
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
  
    var user = {
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    }

    login(user).then(res=> {
      if (res) {
          this.props.history.push(`/main`)       
      }     
    })
  }    
  
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Вход</h1>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Введите email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  error={errors.password}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Пароль"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login