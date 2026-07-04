import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

import { Link, useNavigate } from 'react-router-dom'
import logo from '/helpdesk.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    const { user } = useSelector((state) => state.authR)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

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
                {user ? (
                    <li style={{ display: 'flex', flexDirection: 'column' }}>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                        <p style={{ color: '#828282' }}>Hi,{user.name}</p>
                    </li>
                ) : (
                    <>
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
                    </>
                )}
            </ul>
        </header>
    )
}

export default Header
