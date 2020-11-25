import React from 'react';
import './A-Style.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer-container'>
            <div className='center'>
                <section class='social-media center' >
                    <div class='social-media-wrap'>
                        <div class='footer-logo'>
                            <Link to='/' className='social-logo fontKaushan' style={{ "fontSize": '2rem' }}>
                                FoodDose
                        </Link>
                        </div>
                        <small classN='website-rights' style={{ color: "white" }}>FoodDose © 2020</small>
                        <div class='social-icons'>
                            <Link
                                class='social-icon-link facebook'
                                to='/'
                                target='_blank'
                                aria-label='Facebook'
                            >
                                <i class='fab fa-facebook-f' />
                            </Link>
                            <Link
                                class='social-icon-link instagram'
                                to='/'
                                target='_blank'
                                aria-label='Instagram'
                            >
                                <i class='fab fa-instagram' />
                            </Link>
                            <Link
                                class='social-icon-link youtube'
                                to='/'
                                target='_blank'
                                aria-label='Youtube'
                            >
                                <i class='fab fa-youtube' />
                            </Link>
                            <Link
                                class='social-icon-link twitter'
                                to='/'
                                target='_blank'
                                aria-label='Twitter'
                            >
                                <i class='fab fa-twitter' />
                            </Link>

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Footer;