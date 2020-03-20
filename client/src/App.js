import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route,  Switch} from 'react-router-dom'
import PrivateRoute from './components/access/PrivateRoute'
import PublicRoute from './components/access/PublicRoute'
import Login from './components/login'
import Register from './components/register'
import Navbar from './components/mix.-btn'
import Profile from './components/user/userProfile'
import CreateCollection from './components/collections/create/collectionCreationPage'
import PageUserCollections from './components/user/pageCollectionUser'
import AllCollections from './components/home/allCollectionsPage'
//import PageCollectionUser from './components/user/pageCollectionUser'

function App() {
  return (
      <Router>
        <Switch>
          <div className="App">
            <div className="App">
              <Navbar />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PublicRoute exact path="/profile" component={Profile} />
                <PublicRoute exact path="/add-new-collection" component={CreateCollection}/>
                
                <PublicRoute exact path="/collections-current-user" component={ PageUserCollections}/>
                <PublicRoute exact pazth="/home" component={AllCollections}/>
              </div>
            </div>
          </div>
        </Switch>
      </Router>
  )
}

export default App