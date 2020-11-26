import React from 'react'
import "./feedback.css"
import StarRate from '../user/starrate'
// import Feedback from '../user/starrate';
import $ from 'jquery'


function feedback(props) {
    var feedbackInput = React.createRef();
    var starRate = 0
    const getstarvalue = (value) => {
        starRate = value 
    }

    return (
        <div className='oneresdiv'>
            <div className="mainContainer">
                <div className="Card2">
                    <div className="UpperContainer">
                        <br></br>
                        <h3>Give Us FeedBack</h3>
                    </div>
                    <div className="LowerContainer">

                        <h4>Overall Rating</h4>
                        <StarRate getstarvalue={getstarvalue}></StarRate>
                        <br></br>
                        <label for="feedback"><h3>Write your feedback</h3></label>
                        <br></br>
                        <textarea className="feedback" ref={feedbackInput} type="text" id="feedback" name="feedback" rows="10" cols="25" placeholder="FeedBack"></textarea>
                        <br></br>
                        <button className="feedB" onClick={() => {
                            var user = props.location.state.userid
                            var restaurant = props.location.state.therest
                            // console.log(props.location.state)
                            var feedback = feedbackInput.current.value
                            var data = {
                                rate: starRate,
                                text: feedback,
                                uid: user._id,
                                username: user.userName,
                                rid: restaurant._id,
                                restname: restaurant.Name
                            }
                            $.ajax({
                                method: 'POST',
                                url: '/feedback',
                                data: data,
                                success: (res) => {
                                    console.log(res)
                                    window.history.back();

                                },
                                error: (err) => {
                                    console.log(err)
                                }
                            })
                            console.log(feedback, " the rate ", starRate)
                        }}>SEND</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default feedback

