import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    const { name, email, password, password2 } = formData
    const dispatch = useDispatch()
    const { user, isSuccess, isError, message } = useSelector(
        (state) => state.authR,
    )

    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        // REDIRECT IF USER IS LOGGED IN AND SUCCESS
        if (isSuccess || user) {
            navigate('/')
        }

        // RESETTING THE FORM
        if (isError || isSuccess) {
            dispatch(reset())
        }
    }, [user, isSuccess, isError, message, dispatch, navigate])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = { name, email, password }
            dispatch(register(userData))
        }
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            name='name'
                            id='name'
                            value={name}
                            onChange={onChange}
                            placeholder='Enter Your Name'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            id='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Enter Your Email'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            name='password'
                            id='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Enter Your Password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            name='password2'
                            id='password2'
                            value={password2}
                            onChange={onChange}
                            placeholder='Confirm Your Password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register
