import React from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import SearchInput from '../core/SearchInput'

export default function Search() {
  return (
    <>
      <Appbar />
      <main className="min-h-screen mt-20 w-[95%] lg:w-[80%] mx-auto">
        <SearchInput />
      </main>
      <Footer />
    </>
  )
}
