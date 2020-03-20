import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import {withRouter} from 'react-router-dom'
import UserInfo from './userInfo'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      id:'',
      role: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onSub = this.onSub.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.history.push(`/collections-current-user`)
  }
  onSub(e) {
    e.preventDefault()
    this.props.history.push(`/add-new-collection`)
    
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      name: decoded.name,
      email: decoded.email,
      id: decoded.id,
      role: decoded.role
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Профиль</h1>
          </div>
          <UserInfo data={this.state}/>
          <br/>
            <button className="btn btn-dark" onClick={this.onSub}>Добавить коллекцию</button>
            <button className="btn btn-dark" onClick={this.onSubmit}>Мои коллекции</button>
            <hr/>
        </div>
      </div>
    )
  }
}

export default withRouter(Profile)