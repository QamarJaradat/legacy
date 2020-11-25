import { Link } from "react-router-dom";
import './A-Style.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from './SignInModal';
import { Modal2 } from './SignUpModal';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function Navbar(props) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    //pop up functions
    const [showModal, setShowModal] = useState(false);
    // to open the pop up (toggle between open and close)
    const openModal = () => {
        setShowModal(prev => !prev);
    };
    //pop up functions
    const [showModal2, setShowModal2] = useState(false);
    // to open the pop up (toggle between open and close)
    const openModal2 = () => {
        setShowModal2(prev => !prev);
    };
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
                            <Link to='/Category' className='nav-links fontvav' onClick={closeMobileMenu}>CATEGORIES</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-links fontvav' onClick={openModal}>SIGN IN</Link>
                            <Container>
                                <Modal className='containerPop' showModal={showModal} setShowModal={setShowModal} />
                            </Container>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-links fontvav' onClick={openModal2}>SIGN UP</Link>
                            <Container>
                                <Modal2 showModal={showModal2} setShowModal={setShowModal2} test={props.test} hello={props.hello} />
                            </Container>
                            <Link className='nav-links fontvav' onClick={closeMobileMenu}>SIGN UP</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar