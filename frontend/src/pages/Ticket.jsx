import { useDispatch, useSelector } from 'react-redux'
import { closeTicket, getTicket, reset } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { getNotes, reset as noteReset } from '../features/notes/noteSlice'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'
import { FaPlus, FaWindowClose } from 'react-icons/fa'

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.ticketR,
    )
    const { notes, isLoading: notesisLoading } = useSelector(
        (state) => state.noteR,
    )
    const dispatch = useDispatch()

    const { ticketId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error('message')
            dispatch(reset())
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        // eslint-disable-next-line
    }, [isError, message, ticketId])

    if (isLoading || notesisLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h3>Something Went Wrong</h3>
    }

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const onNoteSubmit = () => {
        console.log('submit clicked')
        closeModal()
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <BackButton url='/tickets' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted :{' '}
                    {new Date(ticket.createdAt).toLocaleString('en-In')}
                </h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className='ticket-desc'>
                    <h3>Description of the Issue </h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>
            {ticket.status !== 'closed' && (
                <button className='btn' onClick={openModal}>
                    <FaPlus />
                    Add Note
                </button>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Add Note'
            >
                <h2>Add Note</h2>
                <button className='btn-close' onClick={closeModal}>
                    <FaWindowClose size={30} />
                </button>
                <form onSubmit={onNoteSubmit}>
                    <div className='form-group'>
                        <textarea
                            name='noteText'
                            id='noteText'
                            className='form-control'
                            placeholder='Please enter Notes'
                            value={noteText}
                            onChange={(e) => {
                                setNoteText(e.target.value)
                            }}
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <button className='btn' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}
            {ticket.status !== 'closed' && (
                <button
                    onClick={onTicketClose}
                    className='btn btn-block btn-danger'
                >
                    Close Ticket
                </button>
            )}
        </div>
    )
}

export default Ticket
