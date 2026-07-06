import axios from 'axios'

const API_URL = '/api/tickets/'

// CREATE NEW TICKET
const createTicketService = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = axios.post(API_URL, ticketData, config)
    return response.data
}

const ticketService = { createTicketService }
export default ticketService
