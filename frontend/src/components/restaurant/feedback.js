import React from 'react'
import "./feedback.css"

function feedback() {
    return (
        <div className='oneresdiv'>
            <div className="mainContainer">
                <div className="Card">
                    <div className="UpperContainer">
                    <br></br>
                       <h3>Give Us FeedBack</h3>
                    </div>
                    <div className="LowerContainer">
                    <form>
                       <h4>Overall Rating</h4>
                       {/* Star Review add here*/}
                       <br></br>   
                       <br></br>  
                       <br></br>  
                       <label for="feedback"><h3>Write your feedback</h3></label>
                       <br></br>
                       <textarea className="feedback" type="text" id="feedback" name="feedback" rows="15" cols="47" placeholder="FeedBack"></textarea>
                        <br></br>
                       <button className="B">SEND</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default feedback

  