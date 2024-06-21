"use client"

import React from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    hasNextPage: boolean,
    hasPrevPage: boolean,
    totalCount: number
}

export default function Pagination({hasNextPage, hasPrevPage, totalCount}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const current = new URLSearchParams(searchParams);

    const page = searchParams.get('page') ?? '1'
    const limit = searchParams.get('limit') ?? '9'

    const handleNext = () => {
        current.set("page", (Number(page) + 1).toString());
        current.set("limit", limit);
        const query = current.toString();
        const queryparam = query ? `?${query}` : "";

        router.push(`${pathname}${queryparam}`);
    }

    const handlePrevious = () => {
        current.set("page", (Number(page) - 1).toString());
        current.set("limit", limit);
        const query = current.toString();
        const queryparam = query ? `?${query}` : "";

        router.push(`${pathname}${queryparam}`);
    }

    return (
        <div className="flex justify-center mt-6 gap-2">
            <button className={`p-2 text-lg ${hasPrevPage ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={!hasPrevPage} onClick={handlePrevious}>{'<'}</button>
            <div className='bg-white p-2 text-lg'>
                {page} / {Math.ceil(totalCount / Number(limit))}
            </div>

            <button className={`p-2 text-lg ${hasNextPage ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={!hasNextPage} onClick={handleNext}> {'>'} </button>
        </div>
    )
}