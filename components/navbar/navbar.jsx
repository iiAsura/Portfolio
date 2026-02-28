"use client";
import React from 'react'
// import "./navbar.css";
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';

import logo from '../../src/assets/favicon-32x32.png'

function Navbar() {
    const menuItems = [
        { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
        { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
        { label: 'Services', ariaLabel: 'View our services', link: '/services' },
        { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
    ];

    const socialItems = [
        { label: 'Twitter', link: 'https://twitter.com' },
        { label: 'GitHub', link: 'https://github.com' },
        { label: 'LinkedIn', link: 'https://linkedin.com' }
    ];
    return (
        <>
            <header className="w-full px-[4vw] flex justify-center z-1000 relative">
                <nav className="max-w-[1280px] py-5 w-full flex justify-between max-md:hidden">
                    <div className="logo flex">
                        <img src={logo} alt="logo" />
                        <h1 className="font-bold text-3xl text-white">Isaiah</h1>
                    </div>
                    <ul className="flex gap-8 items-center ">
                        <li>
                            <a href="/html/home.html" className="transition-all text-white hover:underline ">Home</a>
                        </li>
                        <li>
                            <a href="/html/accomplishment.html" className="transition-all text-white hover:underline ">Accomplishments</a>
                        </li>
                        <li>
                            <a href="/html/previous.html" className="transition-all text-white hover:underline ">Previous Works</a>
                        </li>
                        <li>
                            <a href="/html/resume.html" className="transition-all text-white hover:underline ">Resume</a>
                        </li>

                    </ul>
                </nav>
            </header>

            <div className="hidden max-md:block" style={{ height: '100vh', position: "absolute", width: "100%", background: '#1a1a1a' }}>           
           
                <StaggeredMenu
                    position="right"
                    items={menuItems}
                    socialItems={socialItems}
                    displaySocials
                    displayItemNumbering={true}
                    menuButtonColor="#ffffff"
                    openMenuButtonColor="#fff"
                    changeMenuColorOnOpen={true}
                    colors={['#B19EEF', '#5227FF']}
                    logoUrl={logo}
                    accentColor="#5227FF"
                    onMenuOpen={() => console.log('Menu opened')}
                    onMenuClose={() => console.log('Menu closed')}
                />
            </div>
        </>
    )
}

export default Navbar;