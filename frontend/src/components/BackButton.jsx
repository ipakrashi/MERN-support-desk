import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function BackButton({ url }) {
    return (
        <Link to={url} className='btn brn-reverse btn-back'>
            <FaArrowAltCircleLeft /> Back
        </Link>
    )
}

export default BackButton
