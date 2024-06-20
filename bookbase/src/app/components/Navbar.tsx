import Image from 'next/image'
import Link from 'next/link'
import Logo from './logo.png'
import React from 'react'

export default function Navbar() {
    return (
        <nav className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-10 border-b-2 border-gray-200'>
            <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
                <Image
                    src={Logo}
                    alt='BookBase logo'
                    width={80}
                    quality={100}
                />
            </div>
            <Link className='font-bold hover:text-black underline sm:no-underline' href="/">Home</Link>
            <Link className='font-bold hover:text-black underline sm:no-underline' href="/addbook">Add Book</Link>
        </nav>
    )
}