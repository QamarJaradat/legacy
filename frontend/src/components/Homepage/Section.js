import React from 'react';
import '../../../src/App.css';
import './A-Style.css';
import $ from 'jquery'
const slideImages = [
    'https://i.kym-cdn.com/entries/icons/facebook/000/016/894/mynameehhjeff.jpg',
    'https://i.kym-cdn.com/photos/images/newsfeed/001/597/651/360.jpg',
    'https://ih1.redbubble.net/image.1602700283.0991/pp,504x498-pad,600x600,f8f8f8.jpg',
    'https://i.kym-cdn.com/entries/icons/original/000/033/487/rick.jpg'
];
const properties = {
    duration: 3000,
    transitionDuration: 400,
    infinite: true,
    indicators: false,
    arrows: false,
};

class Section extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchVal: '',
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.searching = this.searching.bind(this)
    }
    updateSearch = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value,
        })
    };
    searching() {
        var searchRes = this.state.searchVal
        $.ajax({
            type: "POST",
            url: "/",
            data: {help:searchRes},
            success: function (res) {
                console.log("it's working")
                
            },
        })
    }
    render() {
        const { search } = this.state;
        return (
            <>
                <div className='imageslider'>
                    <br></br>
                    <br></br>
                    <h1>THIS IS A TEXT</h1>
                    <br></br>



                    <form class="form-inline">
                        <label>
                            <input type="string" value={search} className="form-control inputhover" onChange={this.updateSearch} name="searchVal" placeholder="search for idk lol" />
                            <span></span>
                        </label>
                        <button class="btn btn-outline-success my-2 my-sm-0" onClick={this.searching} type="button">Search</button>

                        <br></br>

                        <br></br>
                        <br></br>
                    </form>

                </div>



            </>
        )
    }
}

export default Section
