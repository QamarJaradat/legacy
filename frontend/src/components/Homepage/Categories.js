import React from 'react';
import { Link } from 'react-router-dom';
import './A-Style.css'
const Category = require('../../category.json')

class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
  }
  render() {
    return (
      <div className="homediv">
        <div className="d-flex flex-wrap justify-content-around catdiv" style={{
          "marginBottom": '50px', marginTop: "18px"
        }}  >
          {
            Category.slice(0, 4).map((item, i) =>
              <div style={{ 'text-align': 'center', marginTop: '45px' }} key={i} > <Link to={{
                pathname: `/Category/${item.Name}`,
                state: { whichcat: item.Name }
              }}><img src={item.Image} style={{ 'cursor': 'pointer' }} alt="" className="imgstyle"
                whichcat={item.Name}></img></Link> <p className='fontcat'>{item.Name} </p>
              </div>)}
        </div>
        <div className="d-flex flex-wrap justify-content-around catdiv" style={{
          "marginBottom": '50px', marginTop: "18px"
        }}  >
          {
            Category.slice(4, 8).map((item, i) =>
              <div style={{ 'text-align': 'center' }} key={i} > <Link to={{
                pathname: `/Category/${item.Name}`,
                state: { whichcat: item.Name }
              }}><img src={item.Image} style={{ 'cursor': 'pointer' }} alt="" className="imgstyle"
                whichcat={item.Name}></img></Link> <p className='fontcat'>{item.Name} </p>
              </div>)}
        </div>
      </div>
    )
  }
}

export default Categories
