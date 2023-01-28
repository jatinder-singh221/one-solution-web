import React from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import Button from '../core/Button'
import Input from '../core/Input'
import Select from '../core/SelectInput'
import TextInput from '../core/TextInput'

export default function Report() {
  return (
    <>
        <Appbar />
        <main className="min-h-screen mt-20 mx-4 lg:mx-10 space-y-4">
            <h1 className='text-4xl font-bold'>Report</h1>
            <form className='w-[80%] lg:w-[40%] space-y-4 mx-auto'>
                <Select {...reportFor} />
                <Input {...title} />
                <TextInput {...desc} />
                <Button title='submit' />
            </form>
        </main>
        <Footer />
    </>
  )
}

const reportFor = {
    name: 'reportFor',
    id: 'reportFor',
    placeholder: 'reportFor',
    label: 'Report For',
    list: [
        { name: "---select in List---", value: '' },
        { name: "Services", value: 's' },
        { name: "Products", value: 'p' },
        { name: "Account", value: 'a' },
        { name: "Notifications", value: 'n' },
        { name: "Others", value: 'o' },
    ]
}

const title = {
    name: 'title',
    id: 'title',
    placeholder: 'title of report',
    label: 'Title',
  }

const desc = {
    name: 'description',
    id: 'description',
    placeholder: 'berif description',
    label: 'Description',
  }