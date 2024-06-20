import React from 'react'
import { BookDetails } from '../types/Book'
import BookCard from './BookCard'

interface Props {
    books: BookDetails[]
}

export default function BookList({ books }: Props) {
    return (
        <>
            {books.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
                    {books.map((book) => {
                        return (
                            <BookCard key={book.id} book={book} />
                        )
                    })}
                </div>
            ) :
                <h2>No results</h2>
            }
        </>
    )
}