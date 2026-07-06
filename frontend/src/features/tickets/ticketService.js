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

// GET ALL TICKETS FOR THE USER LOGGED IN
const getTicketsService = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const ticketService = { createTicketService, getTicketsService }
export default ticketService
