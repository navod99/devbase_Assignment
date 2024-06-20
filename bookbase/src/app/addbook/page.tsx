import React from 'react'
import CreateForm from './CreateForm'

export default function page() {
    return (
        <main className="my-8 px-10 sm:px-12">
            <h2 className="font-bold text-primary text-center text-xl underline">Add Book</h2>
            <CreateForm/>
        </main>
    )
}