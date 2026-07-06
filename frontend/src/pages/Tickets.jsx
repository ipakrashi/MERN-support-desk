import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'

function Tickets() {
    const { tickets, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.ticketR,
    )
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <h1>Tickets</h1>
        </div>
    )
}

export default Tickets
