import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../../public/helpdesk.png'
function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <Link
                    to='/'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src={logo}
                        alt=''
                        style={{
                            width: '45px',
                            border: '1px solid gray',
                            borderRadius: '50%',
                            padding: '5px',
                            marginRight: '10px',
                        }}
                    />
                    Support Desk
                </Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser />
                        Register
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
