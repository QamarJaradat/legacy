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
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.searching = this.searching.bind(this)
    }
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

    updateSearch = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };
    componentDidMount() {
        document.documentElement.scrollTop = 0;
    }
    render() {
        console.log(this.state.search)
        return (
            <div className='homediv'>

                <Section searching={this.searching} updateSearch={this.updateSearch} />
                <div className="d-flex flex-wrap justify-content-around catdiv" style={{
                    "marginBottom": '50px', marginTop: "18px"
                }}>
                    {
                        this.state.search.map((item, i) =>
                            <div style={{ 'text-align': 'center' }} key={i} > <Link to={{
                                pathname: `/restaurant`,
                                state: { whichcat: item.Name }

                            }}><img src={item.Image} style={{ 'cursor': 'pointer' }} alt="" className="imgstylesearch"
                                whichcat={item.Name}></img></Link> <p className='fontcat'>{item.Name} </p>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
export default Home;