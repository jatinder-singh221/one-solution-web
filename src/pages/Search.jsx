import React from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import SearchInput from '../core/SearchInput'
import searchSvg from '../assests/search.svg'

export default function Search() {
  document.title = 'Search'
  return (
    <>
      <Appbar />
      <main className="min-h-screen mt-20 flex items-center justify-center">
        <div className='absolute mx-auto w-[90%] lg:w-[70%] top-20 shadow-lg shadow-violet-300 rounded-md overflow-hidden  transition-all bg-white'>
          <SearchInput />
        </div>
        <img src={searchSvg} alt="searchsvg" className='aspect-video' />
      </main>
      <Footer />
    </>
  )
}
