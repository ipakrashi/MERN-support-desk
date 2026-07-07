import axios from 'axios'

const API_URL = 'api/tickets/'

const getNotesService = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + ticketId + '/notes', config)
    return response.data
}
const noteService = {
    getNotesService,
}
export default noteService
