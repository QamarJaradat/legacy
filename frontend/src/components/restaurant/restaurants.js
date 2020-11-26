import React from "react";
import $ from 'jquery'
import { Link } from 'react-router-dom';


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
                    restaurants: res
                })

            },
            error: (err) => {
                console.log(err)
            }

        })
    }



    render() {
        var cat = this.props.location.state.userid

        console.log(cat)

        return (<div className="d-flex flex-wrap justify-content-around restsdiv"  >
            {
                this.state.restaurants.map((item, i) =>
                    <div style={{ 'text-align': 'center' }} key={i} > <Link to={{
                        pathname: `/Category/${cat}/${item.Name}`,
                        state: {
                            therest: item,
                            userid: this.props.location.state.userid
                        }
                    }}><img src={item.Image} style={{ 'cursor': 'pointer' }} alt="" className="imgstyle"
                        whichcat={item.Name}></img></Link> <p className='fontcat'>{item.Name} </p>
                    </div>)}
        </div>)

    }

}

export default Restaurants;
