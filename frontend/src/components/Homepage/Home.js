import React from 'react';
import '../../../src/App.css';
import './A-Style.css';
import Section from './Section';
import $ from 'jquery'
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchVal: '',
            search: [],
            topRest: []
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.searching = this.searching.bind(this)
    }
    //to get all Reastaurant that match the search
    searching() {
        var searchRes = this.state.searchVal
        $.ajax({
            type: "POST",
            url: "/searchrest",
            data: { search: searchRes },
            success: (res) => {
                this.setState({
                    search: res
                })
            },
        })
    }
    //get search bar value
    updateSearch = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        //get the top 5 Restaurant from the DB
        $.ajax({
            type: "GET",
            url: "/gettop5",
            success: (res) => {
                res = JSON.parse(res)
                this.setState({
                    topRest: res
                })
            },
        })
    }
    render() {
        var ele
        //if there is a result out from search show it 
        if (this.state.search !== 'empty') {
            ele = <>
                {
                    this.state.search.map((item, i) =>
                        <div style={{ 'text-align': 'center' }} key={i} > <div style={{ margin: '10px 0 10px 0' }}><Link to={{
                            pathname: `/restaurant`,
                            state: { whichcat: item.Name }
                        }}><img src={item.Image} style={{ 'cursor': 'pointer' }} alt="" className="imgstylesearch"
                            whichcat={item.Name}></img></Link> <p className='fontcat'>{item.Name} </p></div>
                        </div>
                    )
                }
            </>
        }
        //if ther is no result show this text
        else {
            ele = <h5>No Reault to Show ...</h5>
        }
        return (
            <div className='homediv'>
                <Section searching={this.searching} updateSearch={this.updateSearch} />
                <div className="d-flex flex-wrap justify-content-around catdiv"
                    style={{ "marginBottom": '50px', marginTop: "18px" }}>
                    {ele}
                </div>
                <di>
                    <h3>Top Rated Restaurans</h3>
                    <div className="d-flex flex-wrap justify-content-around catdiv"
                        style={{ "marginBottom": '50px', marginTop: "18px" }}>
                        {
                            this.state.topRest.map((item, i) =>
                                <div style={{ 'text-align': 'center' }} key={i} > <div style={{ margin: '10px 0 10px 0' }}>
                                    <Link to={{
                                        pathname: `/restaurant`,
                                        state: { whichcat: item.Name }
                                    }}>
                                        <img src={item.Image} style={{ 'cursor': 'pointer' }} alt="" className="imgstylesearch"
                                            whichcat={item.Name}></img></Link> <p className='fontcat'>{item.Name} </p></div>
                                </div>
                            )
                        }
                    </div>
                </di>
            </div>
        )
    }
}
export default Home;