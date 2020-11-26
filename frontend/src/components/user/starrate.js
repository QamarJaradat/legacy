import React from 'react'
import { FaStar } from 'react-icons/fa'
import './login.css';
class Feedback extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            starNum: 0,
            hovering: null,
        }
        this.startval = this.startval.bind(this)

    }

    startval(e) {
        this.setState({
            starNum: e.target.value

        })
        // console.log(e.target.value)
        this.props.getstarvalue(e.target.value)
    }
    render() {
        return (
            <div>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1
                    const hoverValue = i + 1
                    return (<label>
                        <input type="radio" name="rating" onClick={this.startval} value={ratingValue} className="starbutton" />
                        <FaStar className="star" size={35} color={ratingValue <= (this.state.hovering || this.state.starNum) ? "#FFC107" : "#D3D3D3"} onMouseEnter={() => { this.setState({ hovering: hoverValue }) }} onMouseLeave={() => { this.setState({ hovering: null }) }} />
                    </label>)
                })}
            </div>
        )
    }
}

export default Feedback
