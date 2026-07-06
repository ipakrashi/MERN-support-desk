import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {
    const { user } = useSelector((state) => state.authR)
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.ticketR,
    )
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProducts] = useState('iphone')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset)
    }, [dispatch, isError, navigate, message, isSuccess])

    if (isLoading) {
        return <Spinner />
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({ product, description }))
    }

    return (
        <>
            <BackButton url='/' />
            <section className='heading'>
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>
            <section className='form'>
                <div className='form-group'>
                    <label htmlFor='name'>Customer Name:</label>
                    <input
                        type='text'
                        disabled
                        className='form-control'
                        value={name}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Customer Email:</label>
                    <input
                        type='email'
                        disabled
                        className='form-control'
                        value={email}
                    />
                </div>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='product'>Product</label>
                        <select
                            name='product'
                            id='product'
                            className='form-control'
                            value={product}
                            onChange={(e) => {
                                setProducts(e.target.value)
                            }}
                        >
                            <option value='iphone'>iphone</option>
                            <option value='Macbook Pro'>Macbook Pro</option>
                            <option value='iPad'>iPad</option>
                            <option value='iMac'>iMac</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>
                            Description of the issue
                        </label>
                        <textarea
                            className='form-control'
                            name='description'
                            id='description'
                            placeholder='Describe the issue'
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket
