
import './App.css';
import { observer} from 'mobx-react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import React, { Component } from 'react'
import Clients from './components/Clients'
import Actions from './components/Actions'
import Dashboard from './components/Dashboard'

export class App extends Component {

  render() {
    return (
      <div className='app'>
      <Router>
            <Link to="/clients">Clients</Link>
            &nbsp;&nbsp;
            <Link to="/actions">Actions</Link>
            &nbsp;&nbsp;
            <Link to="/dashboard">Dashboard</Link>
            &nbsp;&nbsp;
            <Route path="/clients" component={() => <Clients />}/>
            <Route path="/actions" component={() => <Actions />}/>
            <Route path="/dashboard" component={() => <Dashboard />}/>
      </Router>
      </div>
    )

  }
}

export default observer(App);