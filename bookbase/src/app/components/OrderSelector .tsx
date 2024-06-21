"use client"

import React, { useState} from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    order: string
}

export default function OrderSelector({ order }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const current = new URLSearchParams(searchParams);
        const value = event.target.value.trim();

        if (!value) {
            current.delete("sort");
            current.delete("order");
        } else {
            current.set("sort", "title");
            current.set("order", event.target.value);
        };

        const query = current.toString();
        const queryparam = query ? `?${query}` : "";

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