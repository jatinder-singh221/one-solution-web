import React from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'

export default function About() {
    document.title = 'About'
    return (
        <>
            <Appbar />
            <main className="min-h-screen mt-20">
                <div className='mt-12 space-y-6 w-[90%] lg:w-[70%] mx-auto'>
                    <h1 className='text-5xl font-bold'>About Us</h1>
                    <p className='opacity-90'>One Solution is a Professional Services and Product selling Platform. Here we will provide you only best quality services and products, which you want. We're dedicated to providing you the best of Services, with a focus on dependability and we provide home services and product at people homes . We're working to turn our passion for Services into a booming online website. We hope you enjoy our Services as much as we enjoy offering them with a passion for Business and entrepreneurship.</p>
                    <p>I started One Solution with the idea of helping consumer like yourself, by offering online home services.</p>
                    <p>If you are like me then you can't get enough of online home services</p>
                    <p>If so, you are in the right place!</p>
                    <p className='text-3xl'>I am dedicated to</p>
                    <ul className='ml-10 list-disc'>
                        <li>Professional work</li>
                        <li>Budge friendly</li>
                        <li>Consume less time</li>
                    </ul>
                    <p>Thanks!</p>
                </div>
            </main>
            <Footer />
        </>
    )
}
