import React from 'react';
import Navbar from './components/Homepage/Navbar';
import Footer from './components/Homepage/Footer';
import Home from './components/Homepage/Home'
import $ from 'jquery'
import Categories from './components/Homepage/Categories'
import Restaurants from './components/restaurant/restaurants'
import OneRest from './components/restaurant/onerestaurant'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Trips from './components/Homepage/Cards'
import Login from './components/user/login'
import Trip from './components/trips/trips'
import Signup from './components/user/signup'
import MyTrip from './components/trips/mytrips'
import Profile from './components/user/Profile';
import Navbarinup from './components/Homepage/Navbar-login';
import CardResturant from './components/restaurant/cardResturant.js'
import Feedback from './components/restaurant/feedback'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: true,
      hello: 'hello for reeal',
      isuser: false,
      tokenin: "",
      testtrips: [],
      userid: ''
    }
    this.changeLogInStatus = this.changeLogInStatus.bind(this)
    this.getup = this.getup.bind(this)
    this.paymentCheck = this.paymentCheck.bind(this)
    this.getTrips = this.getTrips.bind(this)
    this.changeUserStatus = this.changeUserStatus.bind(this)
    this.test = this.test.bind(this)

  }
  test(name, email, pass) {
    // console.log('does it work? really ' + name + " " + pass + " " + email)

  }

  changeLogInStatus() {
    this.setState({
      islogin: !this.state.islogin,
      // tokenin: ''
    })
  }
  changeUserStatus() {
    this.setState({
      isuser: !this.state.isuser,

    })
  }
  getTrips = () => {
    var alltrips = []
    $.ajax({
      type: "GET",
      url: "/gettrips",
      success: (res) => {
        for (var i in res) {
          alltrips.push(res[i])

        }
        console.log("my first ajax request yay")
        this.setState({
          testtrips: alltrips
        })
      },
      error: function (err) {
        console.error(err)
      }
    })
  }


  getup() {
    console.log('all the way from the app, Hi!', this.state.testtrips)
  }
  componentDidMount() {
    this.setState({
      tokenin: document.cookie
    })
    document.documentElement.scrollTop = 0;
    this.getTrips()
    if (document.cookie !== `authToken=`) {
      console.log('hooray')
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

  paymentCheck() {
    console.log('payment method')
  }
  render() {
    const { islogin } = this.state
    let comp
    let nav
    if (islogin) {
      comp = <Route
        path='/sign-up'
        render={(props) => <Signup toggleLogin={this.changeLogInStatus} />}
      />
    }
    else {
      comp = <Route
        path='/sign-up'
        render={(props) => <Login toggleuser={this.changeUserStatus} toggleLogin={this.changeLogInStatus} hello='hello' />}
      />
    }
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
            {comp}
            <Route
              path="/"
              exact render={(props) => <Home getup={this.getup} userid={this.state.userid} testtrips={this.state.testtrips} paymentCheck={this.paymentCheck} hello={this.state.hello} trip={this.state.thetrip} />}
            />
            <Route
              path="/trips"
              render={(props) => <Trips userid={this.state.userid} getup={this.getup} testtrips={this.state.testtrips} lable1={this.state.hello} trip={this.state.thetrip} />}
            />
            <Route path="/sign-up" exact component={Signup} />
            <Route path="/user" exact render={(props) => <Profile userid={this.state.userid} />}
            />
            <Route path="/trip" exact component={Trip} />
            <Route path="/Category" exact component={Categories} />
            <Route path="/restaurant" exact component={CardResturant} />
            <Route path="/Category/:category" exact component={Restaurants} />
            <Route path="/Category/:category/:rest" exact component={CardResturant} />
            <Route path="/feedback" exact component={Feedback} />

            <Route path="/mytrip" exact component={MyTrip} />
          </Switch>
          <Footer />
        </Router>
      </>

    )


  }
}


export default App;


function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}