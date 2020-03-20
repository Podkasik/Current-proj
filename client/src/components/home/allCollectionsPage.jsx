import React, { Component } from 'react'
import {getAllCollections} from '../actions/collection-func'
import  ShowOneCollection  from '../collections/component/showOneCollection'
import {withRouter} from 'react-router-dom'

class AllCollections extends Component {
  constructor(props) {
      super(props)
      this.state={
        collects:[]
      }

      this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
      this.setState({ [e.target.name]: e.target.value }
        )
  }
  
  componentDidMount() {
    this.mounted = true
    this.populatePosts()
  }
  
 populatePosts = async () => {   
      if(this.mounted){
        getAllCollections().then(res=>{
        console.log(res)
        this.setState({
          collects: res.data.out,
        }) 
      })
    }
  }    
  render() {
      return ( 
      <div className="container">
          <div className="jumbotron mt-5 ">
            <div className='row'>
                <div className ='col-sm-9'>
                 <h1>{this.state.name}</h1>
                 <ShowOneCollection  collects = {this.state.collects}/>
            </div>  
          </div>
      </div>
    </div>
  )
}



}

export default withRouter(AllCollections)