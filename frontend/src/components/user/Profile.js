import React from "react";
import './Profile.css';
import $ from 'jquery'
import { Link } from 'react-router-dom'
// import feedback from "../restaurant/feedback";
// import { List, ListItem, ListItemContent } from 'react-mdl';
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      usename: '',
      useremail: '',
      myrest: [],
      myfeedback: [],
      profileimg: 'https://i.imgur.com/ejGOOnV.jpg'
    }
  }

  componentDidMount() {
    if (this.props.userid.userimage) {
      this.setState({
        profileimg: this.props.userid.userimage
      })
    }
    if (this.props.userid._id)
      $.ajax({
        method: 'POST',
        url: '/getuserinfo',
        data: { id: this.props.userid._id },
        success: (resin) => {
          console.log(resin.feedBack)
          var feedarray = []
          for (var i in resin.feedBack) {
            feedarray.push(resin.feedBack[i])
            this.setState({
              myfeedback: feedarray
            })
          }
          var array = []
          var myrest = resin.favoriteRes
          for (var j in myrest) {
            $.ajax({
              type: "POST",
              url: "/getonerest",
              data: { id: myrest[j] },
              success: (res) => {
                // console.log(res)
                array.push(res)
                this.setState({
                  myrest: array
                })
                // console.log(this.state.myrest)
              },
              error: (err) => {
                console.log(err)
              }
            })
          }
        },
        error: (err) => {
          console.log(err)
        }
      })



  }
  componentWillMount() {
    document.documentElement.scrollTop = 0;

  }
  render() {
    let cards
    if (this.state.myrest) {
      cards = <div className="d-flex flex-wrap justify-content-around restsdiv"  >
        {
          this.state.myrest.map((item, i) =>
            <div style={{ 'text-align': 'center' }} key={i} > <Link to={{
              pathname: `/user/${item.Name}`,
              state: {
                therest: item,
                userid: this.props.userid
              }
            }}><img src={item.Image} style={{ 'cursor': 'pointer' }} alt="" className="imgstyle"
              whichcat={item.Name}></img></Link> <p className='fontcat'>{item.Name} </p>
            </div>)}
      </div>

    }
    if (this.state.myrest.length === 0) {
      cards = <div className="gone">No Favorite Restaurants Added Yet</div>
    }
    let feeds
    if (this.state.myfeedback) {
      feeds = <div className="d-flex flex-column restsdiv"  >
        {
          this.state.myfeedback.map((item, i) =>
            <div style={{ 'text-align': 'left', borderColor: 'black', borderWidth: '2px' }} key={i} > <h6 className="gone"> 
            🍽️ {item.restname +"   "}
            &#11088; {item.rate + "   "} 
            📝 {item.text} </h6>
            </div>)}
      </div>

    }
    if (this.state.myfeedback.length === 0) {
      feeds = <div className="gone">No Feedbacks Added Yet</div>
    }



    return (
      <div className="container">
        <div className="box1">
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4 text-center">
              <div className='picContainer'>
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
              <div>
                <h4 className="text1">Name</h4>
                <h5 className="text">{this.props.userid.userName}</h5>
              </div>
              <br></br>
              <div>
                <h4 className="text1">Email</h4>
                <h5 className="text">{this.props.userid.userMail}</h5>
              </div>
            </div>
          </div>

        </div>
        {/*Faviorate and top rated*/}
        <div className="fav">
          <h4 className="text">Your Faviorate Restaurants</h4>

        </div>


        <div className="box2">
          {cards}
        </div>
        <div className="fav">
          <h4 className="text">Your Restaurants FeedBack</h4>
        </div>
        <div className="box2">
          {feeds}
        </div>
      </div>
    )
  }

}

export default Profile;