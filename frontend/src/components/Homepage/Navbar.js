import { Link } from "react-router-dom";
import './A-Style.css';
import $ from 'jquery'
import React, { useState } from 'react';
// 
function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    //pop up functions


    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <h3 className='fontKaushan'>FoodDose</h3>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/Category' className='nav-links fontvav' onClick={closeMobileMenu}>RESTURANTS</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/user' className='nav-links fontvav' onClick={closeMobileMenu} >USER</Link>

                        </li>
                        <li className='nav-item'>
                            <Link className='nav-links fontvav' onClick={() => {
                                $.ajax({
                                    method: 'POST',
                                    url: '/logout',
                                    success: (res) => {
                                        console.log('see you another time')
                                        window.location.href = "/"
                                    },
                                    error: (err) => {
                                        console.log(err)

                                    }


                                })
                            }}>SIGN OUT</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar