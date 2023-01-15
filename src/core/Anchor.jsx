import { Link } from 'react-router-dom'

export default function Anchor(props) {
  return (
    <Link to={props.to} className='block text-sm' title={props.name || 'title'}>
        {props.name || 'No title'}
    </Link>
  )
}