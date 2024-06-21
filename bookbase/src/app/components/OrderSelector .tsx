"use client"

import React from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    order: string | string[]
}

export default function OrderSelector({ order }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {

        // Create a new URLSearchParams object with the current search parameters
        const current = new URLSearchParams(searchParams);
        const value = event.target.value.trim();

        // If the value is empty, remove 'sort' and 'order' parameters from the URL
        if (!value) {
            current.delete("sort");
            current.delete("order");
        } else {
            // Otherwise, set 'sort' to 'title' and 'order' to the selected value
            current.set("sort", "title");
            current.set("order", event.target.value);
        };

        const query = current.toString();
        const queryparam = query ? `?${query}` : "";

        // Navigate to the new URL with the updated search parameters
        router.push(`${pathname}${queryparam}`);
    }
    
        return (
            <>
                <select
                    className="block my-4 px-2 py-1 bg-primary bg-opacity-5 border border-gray-300 rounded"
                    onChange={onSelect}
                    value={order}
                >
                    <option value="">Normal order</option>
                    <option value="asc">Ascending order</option>
                    <option value="desc">Descending order</option>
                </select>                   
            </>
        )
    }