import React from 'react';
import '../../../src/App.css';
import { Button } from './BookButton';
import './A-Style.css';
import image1 from './images/goose.jpg';
import image2 from './images/mynameehhjeff.jpg';
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
    }
    updateSearch = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    render() {
        const { search } = this.state;
        return (
            <>
                <div className='imageslider'>
                <br></br>
                    <br></br>
                    <h1>THIS IS A TEXT</h1>
                    <br></br>
                    

                    <form>
                        <input type="string" value={search} className="form-control inputhover" onChange={this.updateSearch} name="searchVal" placeholder="search for idk lol" />
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
