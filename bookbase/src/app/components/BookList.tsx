import React from 'react'
import { BookListResponse } from '../types/Book'
import BookCard from './BookCard'
import OrderSelector from './OrderSelector ';
import Pagination from './Pagination';

// routes being rendered for each user at request time
export const dynamic = "force-dynamic";

interface queryParameters {
    order: string | string[],
    sort: string| string[],
    pageNumber: string| string[],
    limit: string| string[]
}

async function getBooks(params: queryParameters) {
    // Determine the URL based on presence of sort and order parameters
    let url = `${process.env.NEXT_PUBLIC__BASE_URL}?page=${params.pageNumber}&limit=${params.limit}`;
    if (params.order && params.sort) {
        url += `&sort=${params.sort}&order=${params.order}`;
    }

    // Fetch data from the API
    const res = await fetch(url, {
        next: {
            revalidate: 0
        }
    })

    if (res.ok) {
        const totalCount = res.headers.get('X-Total-Count');
        const data = await res.json();
        return { data, totalCount }
    }
}

export default async function BookList({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Extract searchparams
    const order = searchParams['order'] ?? "";
    const sort = searchParams['sort'] ?? "";
    const pageNumber = searchParams['page'] ?? "1";
    const limit = searchParams['limit'] ?? "9";

    // Calculate the start index for pagination
    const start = (Number(pageNumber) - 1) * Number(limit)
    // Calculate the end index for pagination
    const end = start + Number(limit)

    const params: queryParameters = { order, sort, pageNumber, limit }

    // Fetch the list of books
    const books: BookListResponse | undefined = await getBooks(params)

    return (
        <>
            <div className='flex justify-center sm:justify-end'>
                <OrderSelector order={order || ""} />
            </div>

            {books && books.data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
                    {books.data.map((book) => {
                        return (
                            <BookCard key={book.id} book={book} />
                        )
                    })}
                </div>
            ) :
                <h2>No results</h2>
            }

            <Pagination
                totalCount = { Number(books?.totalCount)}
                hasNextPage={end < Number(books?.totalCount)}
                hasPrevPage={start > 0}
            />
        </>
    )
}