import React from 'react'

function ShowOneCollection(props) {
  var collects = props.collects
    return (
        <div>
            { collects ?
              collects.map((collect, i) =>             
                      <div className="collection-component" key={i}> 
                            <h2  className='text-left'>Название коллекции: {collect.name}</h2>
                            <br/>
                            <br/>
                            <br/>
                            <h5>Описание: {collect.description}</h5>
                            <hr/>
                            <br/>
                            <br/>
                            <h5>Тип коллекции: {collect.subject}</h5>
                            <hr/>
                            <br/>
                            <h5>ID пользователя: {collect.userId}</h5>
                            <hr/>
                            <br/>
                            <h5>Имя пользователя: {collect.userName}</h5>
                            <hr/>
                            <div className='row'>
                              <div className='col-sm-6'>
                                <h5>Дата создания: {collect.date}</h5>
                              </div>
                            </div>
                            <br/>
                            <hr/>                           
                      </div>
                  ) 
                  :  "Loading..."
            }           
          </div>
    )    
  }

export default ShowOneCollection