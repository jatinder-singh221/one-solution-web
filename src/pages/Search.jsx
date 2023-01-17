import React from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import SearchInput from '../core/SearchInput'

export default function Search() {
  return (
    <>
        <Appbar />
        <main className="min-h-screen mt-16">
            <SearchInput />
        </main>
        <Footer />
    </>
  )
}
