import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from './Button'

export default function ImagePreview(props) {
    const handleClose = () =>{ 
        props.setisOpen(!props.isOpen)
        document.getElementById('profile').value = ""
    }

    const handleImageFunction = async () => {
        props.uploadFunction()
    }

    return (
        <Transition
            show={props.isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100 duration-200"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
        >
            <Dialog open={props.isOpen} onClose={handleClose} className='backdrop-filter 
        backdrop-blur-md fixed top-0 left-0 w-full h-screen flex items-end justify-center
    '>
                <Dialog.Panel className='mb-24 lg:mb-2 bg-white w-[95%] lg:w-[40%]  
        rounded p-6 drop-shadow-xl space-y-6'>
                    <Dialog.Description className='space-y-6' as='div'>
                        <img src={props.image.preview} alt="new-profile" className=' w-full object-contain aspect-video border border-dashed border-black dark:border-white rounded ' />
                        <div className='flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0'>
                            <Button title='cancel' onClick={handleClose} />
                            <Button title="Upload Image" onClick={handleImageFunction} />
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    )
}