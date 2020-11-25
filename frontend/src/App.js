import React from 'react';
import $ from 'jquery'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Navbar from './components/Homepage/Navbar';
import Navbarinup from './components/Homepage/Navbar-login';
import Home from './components/Homepage/Home'
import Footer from './components/Homepage/Footer';

import Profile from './components/user/Profile';
import Feedback from './components/restaurant/feedback'

import Categories from './components/Homepage/Categories'
import Restaurants from './components/restaurant/restaurants'
import CardResturant from './components/restaurant/cardResturant.js'
import OneRest from './components/restaurant/onerestaurant'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: true,
      tokenin: "",
      userid: ''
    }
    this.changeLogInStatus = this.changeLogInStatus.bind(this)
  }

  changeLogInStatus() {
    this.setState({
      islogin: !this.state.islogin,
    })
  }
  componentDidMount() {
    this.setState({
      tokenin: document.cookie
    })
    document.documentElement.scrollTop = 0;
    if (document.cookie !== `authToken=`) {
      $.get('/checkuser', (res) => {
        console.log(res._id)
        $.ajax({
          method: 'POST',
          url: '/getuserinfo',
          data: { id: res._id },
          success: (resin) => {
            console.log(resin._id)
            this.setState({
              userid: resin
            })
          },
          error: (err) => {
            console.log(err)
          }
        })
      })
    }
  }

  render() {
    let nav 
    if (this.state.tokenin !== `authToken=` && this.state.tokenin !== '') {
      console.log('token')
      nav = <Navbar></Navbar>
    }
    else {
      console.log('noo token')
      nav = <Navbarinup hello="hello bro" test={this.test}></Navbarinup>
    }
    return (
      <>
        <Router>
          {nav}
          <Switch>
            <Route
              path="/"
              exact render={(props) => <Home userid={this.state.userid}/>}/>
            <Route path="/user" exact render={(props) => <Profile userid={this.state.userid} />}/>
            <Route path="/Category" exact component={Categories} />
            <Route path="/restaurant" exact component={CardResturant} />
            <Route path="/Category/:category" exact component={Restaurants} />
            <Route path="/Category/:category/:rest" exact component={CardResturant} />
            <Route path="/feedback" exact component={Feedback} />
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}


export default App;
