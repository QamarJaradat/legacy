import React from 'react';
import '../../../src/App.css';
import './A-Style.css';
// const slideImages = [
//     'https://i.kym-cdn.com/entries/icons/facebook/000/016/894/mynameehhjeff.jpg',
//     'https://i.kym-cdn.com/photos/images/newsfeed/001/597/651/360.jpg',
//     'https://ih1.redbubble.net/image.1602700283.0991/pp,504x498-pad,600x600,f8f8f8.jpg',
//     'https://i.kym-cdn.com/entries/icons/original/000/033/487/rick.jpg'
// ];
// const properties = {
//     duration: 3000,
//     transitionDuration: 400,
//     infinite: true,
//     indicators: false,
//     arrows: false,
// };

class Section extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchVal: '',
        }
    }

    render() {
        const { search } = this.state;
        return (
            <>
                <div className='imageslider '>
                    <div className='secimg'>
                        <br></br>
                        <br></br>
                        <h1 className="restqo">Nothing Brings People Together Like Good Food</h1>
                        <br></br>
                        <input type="string" value={search} className="form-control  inputhover" onChange={this.props.updateSearch} name="searchVal" placeholder="Search for a Restaurant . . ." />
                        <button className="btn  Bsearch my-2 my-sm-0" onClick={this.props.searching} type="button">Search</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </>
        )
    }
}

export default Section
