import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Logo from './Logo'

export default function MenuItem(props) {
    return (
        <Menu as={Fragment}>
            {props.button}
            <Transition
                enter='transition ease-out duration-300'
                enterFrom='opacity-0 translate-y-1'
                enterTo='opacity-100 translate-y-0'
                leave='transition ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'
                as={Fragment}
            >
                <Menu.Items as='ul' className='z-50 fixed max-h-[85vh] w-[90%] left-auto lg:w-80 right-auto
                lg:bottom-auto  lg:right-2 lg:top-14 backdrop-filter hidden-scrollbar lg:shadow-md lg:shadow-violet-600
                backdrop-blur-3xl outline-none rounded-t-lg lg:rounded-lg space-y-4 p-4 
                bottom-0 overflow-y-auto'
                >
                    <Menu.Item as='div' className='w-full flex'>
                        <Logo />
                        <button type='button' className='ml-auto text-sm text-blue-500'>Done</button>
                    </Menu.Item>
                    {props.children}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}