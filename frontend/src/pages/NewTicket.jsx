import { useState } from 'react'
import { useSelector } from 'react-redux'

function NewTicket() {
    const { user } = useSelector((state) => state.authR)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProducts] = useState('iphone')
    const [description, setDescription] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
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
