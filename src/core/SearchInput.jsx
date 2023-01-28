import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Search } from '../api'

export default function SearchInput(props) {

    const [list, setlist] = useState(false)
    const [search, setsearch] = useState({
        value: '',
        api: [],
        insted: [
            { name: 'Services', to: '/services' },
            { name: 'Products', to: '/products' },
        ]
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const api = await Search(search.value)
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                if (apiRes.data.length > 0)
                    setsearch(pre => ({ ...pre, api: apiRes.data, value:apiRes.from }))
                setlist(true)
                break;
            default:
                navigate(`/${api.status}`)
                break;
        }
    }

    return (
        <form onSubmit={handleSubmit} className='transition-all'>
            <label htmlFor="search" className='h-12 px-4 space-x-2   flex items-center'>
                <MagnifyingGlassIcon className="w-4 h-4 text-black" />
                <input type="search" name="search" id="search" className="flex-1 h-full border-0 ring-0 focus:ring-0
                    bg-transparent text-sm text-black placeholder:text-black outline-none"
                    placeholder="Search Services, Professional, Bussiness" value={search.data?.name} autoFocus={props.autoFocus || false}
                    onChange={(e) => setsearch(pre => ({ ...pre, value: e.target.value }))}
                    autoComplete='off' required
                />
                <button type="submit" className="hover:opacity-80 active:scale-90 py-1 px-2 
                    bg-black rounded-md text-white"
                >
                    Go
                </button>
            </label>
            {list && search.value !== '' && <ul className="space-y-1 border-t p-2">
                {search.api.length > 0 ?
                    <>
                        {search.api.map((data, index) => {
                            return <li key={index} >
                                <Link to={`/${search.value}/${data.slug}`} className=' block text-sm 
                                    border-b-2 border-transparent hover:bg-indigo-500/20 
                                    hover:text-indigo-500 py-2 px-3 rounded-md'
                                >
                                    <p className="font-medium">{data.name}</p>
                                </Link>
                            </li>
                        })}
                    </>
                    :
                    <li className="text-sm space-y-2">
                        <p>No Result For <span className="underline">{search.value}</span></p>
                        <p>Search insted</p>
                        <ul className="ml-4 space-y-2">
                            {search.insted.map((data, index) => {
                                return <li key={index} className='underline'>
                                    <Link to={data.to}>{data.name}</Link>
                                </li>
                            })}
                        </ul>
                    </li>
                }
            </ul>}
        </form>
    )
}