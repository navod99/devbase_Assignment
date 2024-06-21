import React from 'react'
import { BookDetails } from '../types/Book'

interface Props {
    book: BookDetails
}
export default function BookCard({ book }: Props) {
    return (
        <div className='max-w-md rounded overflow-hidden shadow-lg p-6 bg-white'>
            <div className="font-bold text-xl mb-2">{book.title}</div>
            <p className="text-gray-700 text-base">
                {book.author}
            </p>
        </div>
        )
}