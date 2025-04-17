'use client'

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function HeaderPageLister() {
    const [pathTitle, setPathTitle] = useState('')
    const pathname = usePathname();

    useEffect(() => {
        const match = pathname.match(/^\/pages\/([^/]+)/);
        if (match) {
            const routeKey = match[1];

            switch (routeKey) {
                case 'brands':
                    setPathTitle('Brands');
                    break;
                case 'shoes':
                    setPathTitle('Shoes')
                    break
                case 'categories':
                    setPathTitle('Categories');
                    break;
                default:
                    setPathTitle('')
                    break;
            }
        } else {
            setPathTitle('')
        }
    }, [pathname]);

    return (
        <div className="flex-1 flex justify-center items-center">
            <span className="text-center text-sm font-semibold">{pathTitle}</span>
        </div>
    )
}