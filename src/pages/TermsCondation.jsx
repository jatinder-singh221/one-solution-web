import React from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'

export default function TermsCondation() {
    document.title = 'Terms and condations'
    return (
        <>
            <Appbar />
            <main className="min-h-screen mt-20">
                <div className='mt-12 space-y-6 w-[90%] lg:w-[70%] mx-auto'>
                <h1 className='text-5xl font-bold'>Terms and Condations</h1>
                    <ul className='list-decimal space-y-4'>
                        <li className='space-y-2'>
                            <p className='font-bold font-lg capitalize'>introductions</p>
                            <p className='text-sm'>Welcome to one solution (“Company”, “we”, “our”, “us”)!

                                These Terms of Service (“Terms”, “Terms of Service”) govern your use of our website located at onesolution.com (together or individually “Service”) operated by one solution.

                                Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.

                                Your agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements, and agree to be bound of them.

                                If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at support.onesolution@gmail.com so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.</p>
                        </li>
                        <li className='space-y-2'>
                            <p className='font-bold font-lg capitalize'>Communications</p>
                            <p className='text-sm'>By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at support.onesolution@gmail.com.</p>
                        </li>
                        <li className='space-y-2'>
                            <p className='font-bold font-lg capitalize'>Purchases</p>
                            <p className='text-sm'>If you wish to purchase any product or service made available through Service (“Purchase”), you may be asked to supply certain information relevant to your Purchase including but not limited to, your credit or debit card number, the expiration date of your card, your billing address, and your shipping information.

                                You represent and warrant that: (i) you have the legal right to use any card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.

                                We may employ the use of third party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.

                                We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.

                                We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.</p>
                        </li>
                        <li className='space-y-2'>
                            <p className='font-bold font-lg capitalize'>Refunds</p>
                            <p className='text-sm'>We issue refunds for Contracts within 2 days of the original purchase of the Contract.</p>
                        </li>
                        <li className='space-y-2'>
                            <p className='font-bold font-lg capitalize'>Accounts</p>
                            <p className='text-sm'>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.

                                You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.

                                You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.

                                We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</p>
                        </li>
                        <li className='space-y-2'>
                            <p className='font-bold font-lg capitalize'>Copyright Policy</p>
                            <p className='text-sm'>We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on Service infringes on the copyright or other intellectual property rights (“Infringement”) of any person or entity.

                                If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to support.onesolution@gmail.com, with the subject line: “Copyright Infringement” and include in your claim a detailed description of the alleged Infringement as detailed below, under “DMCA Notice and Procedure for Copyright Infringement Claims”

                                You may be held accountable for damages (including costs and attorneys’ fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through Service on your copyright.</p>
                        </li>
                    </ul>
                    <p>Thanks!</p>
                </div>
            </main>
            <Footer />
        </>
    )
}
