import React from 'react'
import "./feedback.css"
import StarRate from '../user/starrate'


function feedback() {
    return (
        <div className='oneresdiv'>
            <div className="mainContainer">
                <div className="Card2">
                    <div className="UpperContainer">
                        <br></br>
                        <h3>Give Us FeedBack</h3>
                    </div>
                    <div className="LowerContainer">
                        <form>
                            <h4>Overall Rating</h4>
                            <StarRate></StarRate>
                            <br></br>
                            <label for="feedback"><h3>Write your feedback</h3></label>
                            <br></br>
                            <textarea className="feedback" type="text" id="feedback" name="feedback" rows="10" cols="25" placeholder="FeedBack"></textarea>
                            <br></br>
                            <button className="feedB">SEND</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default feedback

