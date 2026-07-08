import axios from 'axios'

const API_URL = '/api/tickets/'

const getNotesService = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + ticketId + '/notes', config)
    return response.data
}

const createNoteService = async (noteText, ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(
        API_URL + ticketId + '/notes',
        { text: noteText },
        config,
    )
    return response.data
}

const noteService = {
    getNotesService,
    createNoteService,
}
export default noteService
