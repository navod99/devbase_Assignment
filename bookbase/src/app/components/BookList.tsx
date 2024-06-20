import React from 'react'
import { BookDetails } from '../types/Book'
import BookCard from './BookCard'

async function getBooks() {
    const res = await fetch('http://localhost:5001/books', {
        next: {
            revalidate: 0
        }
    })

    if (res.ok) {
        return res.json();
    }
}

export default async function BookList() {
    const books: BookDetails[] | undefined = await getBooks()

    return (
        <>
            {books && books.length > 0 ? (
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