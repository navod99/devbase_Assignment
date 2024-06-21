import React from 'react'
import { BookDetails } from '../types/Book'
import BookCard from './BookCard'
import OrderSelector from './OrderSelector ';

export const dynamic = "force-dynamic";

async function getBooks(order: string, sort: string) {
    
    let res:any = null;
    if(order && sort) {
        res = await fetch(`${process.env.NEXT_PUBLIC__BASE_URL}/?sort=${sort}&order=${order}`, {
            next: {
                revalidate: 0
            }
        })
    }
    else{
        res = await fetch(`${process.env.NEXT_PUBLIC__BASE_URL}`, {
            next: {
                revalidate: 0
            }
        })
    }

    if (res.ok) {
        return res.json();
    }
}

export default async function BookList({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const selectedOrder = searchParams?.order ?? "";
    const selectedSort = searchParams?.sort ?? "";

    const order = Array.isArray(selectedOrder)
        ? selectedOrder[0]
        : selectedOrder;

    const sort = Array.isArray(selectedSort)
        ? selectedSort[0]
        : selectedSort;

    const books: BookDetails[] | undefined = await getBooks(order, sort)

    return (
        <>
            <div className='flex justify-center sm:justify-end'>
                <OrderSelector order={order || ""} />
            </div>

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