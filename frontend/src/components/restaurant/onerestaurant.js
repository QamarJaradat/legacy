import React from "react";
import $ from 'jquery'
// import { Link } from 'react-router-dom';
import './rest.css'



class Restaurants extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            restaurants: []
        }

    }

    componentDidMount() {

        var cat = this.props.location.state.whichcat
        document.documentElement.scrollTop = 0;
        $.ajax({
            method: 'POST',
            url: '/getcat',
            data: { cat: cat },
            success: (res) => {
                this.setState({
                    restaurants: res,
                    checked: false

                })

            },
            error: (err) => {
                console.log(err)
            }

        })
    }


    render() {

        return (< div className='restdiv'><div>hello</div>

        </ div>)
    }

}

export default Restaurants;
