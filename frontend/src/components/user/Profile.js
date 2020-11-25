import React from "react";
import './Profile.css';
import Carditem from './UserCarditem';
import $ from 'jquery'
// import { List, ListItem, ListItemContent } from 'react-mdl';
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      usename: '',
      useremail: '',
      mytrips: '',
      profileimg: 'https://i.imgur.com/ejGOOnV.jpg'
    }
    this.booktrip = this.booktrip.bind(this)
  }

  booktrip() {
    console.log('clicked')
  }

  componentDidMount() {
    console.log(this.props.userid)
    if (this.props.userid.userimage) {
      this.setState({
        profileimg: this.props.userid.userimage
      })
    }
    var array = []
    if (this.props.userid.trips) {
      var mytrips = this.props.userid.trips
      for (var i in mytrips) {
        $.ajax({
          type: "POST",
          url: "/getmytrips",
          data: { id: mytrips[i] },
          success: (res) => {
            console.log(res)
            array.push(res)
            this.setState({
              mytrips: array
            })
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    }
  }
  componentWillMount() {
    document.documentElement.scrollTop = 0;

  }
  render() {
    let cards
    if (this.state.mytrips) {
      cards = <div> <ul className="cards__items">
        {this.state.mytrips.slice(0, 3).map((trip) =>
          <Carditem
            src={trip.image[0][0]}
            label={trip.name}
            text={trip.explore}
            path='/mytrip'
            trip={trip}
            paymentCheck={this.props.paymentCheck}
          />)}</ul>
        <ul className="cards__items">
          {this.state.mytrips.slice(3, 5).map((trip) =>
            <Carditem
              src={trip.image[0][0]}
              label={trip.name}
              text={trip.explore}
              path='/mytrip'
              trip={trip}
              paymentCheck={this.props.paymentCheck}
            />)}</ul>
      </div>

    }
    else {
      cards = <div>No Booked Trips Yet</div>
    }
    return (
    <div className="container">
      <div className="box1">
         <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4 text-center">
               <div className='picContainer'>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
                 <img className="img1"  
                   src={this.state.profileimg}
                   alt="userPic"
                    />
              </div>
           </div>
          <div className="col-sm-4 col-md-4 col-lg-4"> 
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
               <div>
                  <h4 className="text1">Name</h4>
                  <h6 className="text1">{this.props.userid.userName}</h6>
               </div>
               <br></br>
               <div>
                  <h4 className="text1">Email</h4>
                  <h6 className="text1">{this.props.userid.userMail}</h6>
              </div>
         </div>
       </div>

      </div>
      {/*Faviorate and top rated*/}
      <div className="fav">
         <h4 className="text">Your Faviorate Restaurants</h4>
      </div>
      <div className="box2">
        
      </div>
      <div className="fav">
         <h4 className="text">Your Restaurants FeedBack</h4>
      </div>
      <div className="box2">
        
      </div>
    </div> 
    )
  }

}

export default Profile;



