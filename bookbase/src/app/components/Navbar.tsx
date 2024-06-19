import Image from 'next/image'
import Link from 'next/link'
import Logo from './logo.png'
import React from 'react'

export default function Navbar() {
    return (
        <nav className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 my-10 pb-4 mx-auto max-w-5xl border-b-2 border-gray-200'>
            <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
                <Image
                    src={Logo}
                    alt='BookBase logo'
                    width={100}
                    quality={100}
                />
            </div>
            <Link className='hover:text-black underline sm:no-underline' href="/">Dashboard</Link>
            <Link className='hover:text-black underline sm:no-underline' href="/tickets">Tickets</Link>
        </nav>
    )
}