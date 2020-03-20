import React from 'react'

function UserInfo(props) {  
    return <table className="table col-md-6 mx-auto">
    <tbody>
      <tr>
        <td>Id:</td>
        <td>{props.data.id}</td>
      </tr>
      <tr>
        <td>Имя:</td>
        <td>{props.data.name}</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td>{props.data.email}</td>
      </tr>
      <tr>
        <td>Роль:</td>
        <td>{props.data.role}</td>
      </tr>
    </tbody>
  </table>
}

export default UserInfo