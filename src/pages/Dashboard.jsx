import React from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <Appbar />
      <main className="mt-20 min-h-screen">
        <h1>My Bookings</h1>
      </main>
      <Footer />
    </>
  )
}
