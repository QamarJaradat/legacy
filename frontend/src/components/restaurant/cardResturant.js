import React from 'react'
import { Link } from 'react-router-dom';
import "./cardResturant.css"
import $ from 'jquery'

class CardResturant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.location.state.userid,
            rest: this.props.location.state.therest,
            count: 0,
            color: 'withe',
            txtcolor: 'black',
            fav: 'Add to Faviorate'
        }
        this.addfav = this.addfav.bind(this)
        this.removefav = this.removefav.bind(this)

    }
    componentDidMount() {

        this.setState({
            user: this.props.location.state.userid,
        })
        $.ajax({
            method: 'POST',
            url: '/getuserinfo',
            data: { id: this.state.user._id },
            success: (resin) => {
                console.log(resin._id)
                this.setState({
                    user: resin
                })
                if (this.state.user.favoriteRes.includes(this.state.rest._id)) {
                    console.log('findit')
                    this.setState({
                        count: 1,
                        color: 'red',
                        txtcolor: "white",
                        fav: 'Remove from Faviorate'
                    })
                }
                else {
                    this.setState({
                        count: 0,
                        color: 'white',
                        txtcolor: "black",
                        fav: 'Add to Faviorate'

                    })
                }
            },
            error: (err) => {
                console.log(err)
            }
        })

        $.ajax({
            method: 'POST',
            url: "/getonerest",
            data: { id: this.state.rest._id },
            success: (res) => {
                this.setState({
                    rest: res,
                })
            },
            error: (err) => {
                console.log('err')
            }
        })

    }

    removefav() {
        var data = {
            uid: this.state.user._id,
            rid: this.state.rest._id
        }
        $.ajax({
            method: 'POST',
            url: "/removefav",
            data: data,
            success: (res) => {
                this.setState({
                    rest: res,
                    count: 0,
                    color: 'white',
                    txtcolor: "black",
                    fav: 'Add to Faviorate'
                })
            },
            error: (err) => {
                console.log('err')
            }
        })

    }
    addfav() {

        var data = {
            uid: this.state.user._id,
            rid: this.state.rest._id
        }
        if (this.state.count === 1) {
            this.removefav()
        }

        if (this.state.count !== 1)
            $.ajax({
                method: 'POST',
                url: "/addfav",
                data: data,
                success: (res) => {
                    console.log('iiin')
                    $.ajax({
                        method: 'POST',
                        url: "/getonerest",
                        data: { id: this.state.rest._id },
                        success: (res) => {
                            this.setState({
                                rest: res,
                                count: 1,
                                color: 'red',
                                txtcolor: "white",
                                fav: 'Remove from Faviorate'
                            })
                        },
                        error: (err) => {
                            console.log('err')
                        }
                    })
                },
                error: (err) => {
                    console.log('err')
                }
            })
    }

    render() {
        return (
            <div className='oneresdiv'>
                <div className="mainContainer">
                    <div className="Card">
                        <div className="UpperContainer">
                            <div className="imgContainer">
                                <img src={this.props.location.state.therest.Image} alt="" height="100px" width="100px" />
                            </div>
                        </div>
                        <div className="LowerContainer">
                            <h3>{this.state.rest.Name}</h3>
                            <h4>{this.state.rest.Phone}</h4>
                            <p>{this.state.rest.Address}</p>
                            <span>
                                <p><i class="fas fa-star" id="st"></i> {this.state.rest.restaurantRate} </p>
                                <p> <i class="fas fa-heart" id="heart"></i> <h7>{this.state.rest.Likes.length}</h7>   </p>
                            </span>
                            <button className="B" onClick={this.addfav} style={{ backgroundColor: this.state.color, color: this.state.txtcolor }} >{this.state.fav}</button>

                            <br></br>
                            <Link to={{
                                pathname: '/feedback',
                                state: {
                                    userid: this.props.location.state.userid,
                                    therest: this.props.location.state.therest
                                }
                            }}>
                                <button className="B"   >Add your FeedBack</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardResturant