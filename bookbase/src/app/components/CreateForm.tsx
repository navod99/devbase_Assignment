"use client"

import {useRouter} from 'next/navigation';
import React, {useState } from 'react'

interface ErrorState {
    title: string;
    author: string;
  }

export default function CreateForm() {
    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorState>({ title: '', author: '' });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Reset errors
        setError({ title: '', author: '' });

        if(title.trim() === ''){
            setError((prevError) => ({...prevError, title: 'Title is required' }));
            return;
        }

        if(author.trim() === ''){
            setError((prevError) => ({...prevError, author: 'Author is required' }));
            return;
        }

        setIsLoading(true);

        let body = { title, author };

        // API for create
        const res = await fetch(`${process.env.NEXT_PUBLIC__BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        if (res.status === 201) {
            router.push('/');
            router.refresh();
        }

    }

    return (
        <form onSubmit={handleSubmit} className="block mt-6 py-4 px-7 mx-auto min-w-fit w-1/4
         bg-primary bg-opacity-5 rounded-md">
            <label className="block mb-4">
                <span className='font-semibold'>Book Title:</span>
                <input
                    className="block mt-2 mb-1 px-2 py-1 rounded-sm w-full"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                {error.title && <span className=" text-red-500">{error.title}</span>}
            </label>
            <label  className="block mb-4">
                <span className='font-semibold'>Author:</span>
                <input
                    className="block mt-2 mb-1 px-2 py-1 rounded-sm w-full"
                    type="text"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                />
                {error.author && <span className="mb-2 text-red-500">{error.author}</span>}
            </label>
            <button
                className="block mx-auto mt-7 py-1 px-2  bg-primary hover:bg-blue-700 text-white font-bold rounded"
                disabled={isLoading}
                type='submit'
            >
                {isLoading && <span>Adding...</span>}
                {!isLoading && <span>Add Book</span>}
            </button>
        </form>
    )
}