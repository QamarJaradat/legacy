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
            count: 0
        }
        this.addfav = this.addfav.bind(this)
    }
    componentDidMount() {
        this.setState({
            user: this.props.location.state.userid,
            // rest: this.props.location.state.therest
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
        // console.log(this.props.location.state.therest)

    }
    addfav() {
        var data = {
            uid: this.state.user._id,
            rid: this.state.rest._id
        }
        if (this.state.count !== 1)
            $.ajax({
                method: 'POST',
                url: "/addfav",
                data: data,
                success: (res) => {
                    $.ajax({
                        method: 'POST',
                        url: "/getonerest",
                        data: { id: this.state.rest._id },
                        success: (res) => {
                            this.setState({
                                rest: res,
                                count: 1
                            })
                            // window.location.reload()

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
                                <p>Rate {this.state.rest.restaurantRate} </p>
                                <p> Likes {this.state.rest.Likes.length}   </p>
                            </span>
                            <button className="B" onClick={this.addfav} >Add to Faviorate</button>

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