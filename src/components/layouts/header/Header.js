import React from 'react'
import { Link } from 'react-router-dom'

function Header() {

    return (
        <header>
            <h1 className='logo'>
                <Link to='/'><i className='bx bx-map-pin logo-icon'></i>AirMap</Link>
            </h1>

            <div>
                <ul className='header__list'>
                    <li className='header__list--item'>
                        <Link to='/'>Trang chủ</Link>
                    </li>
                    <li className='header__list--item'>
                        <Link to='#'>Link 1</Link>
                    </li>
                    <li className='header__list--item'>
                        <Link to='#'>Link 2</Link>
                    </li>
                </ul>
                <i className="fas fa-bars bars-icon"></i>
            </div>
        </header>
    )
}

export default Header
