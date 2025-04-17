'use client'
import React from 'react';
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function ErrorPage({ error }: { error: Error }) {

    const router = useRouter();

    const handleRetry = () => {
        router.refresh()
    };

    return (
        <div className={'h-screen grid place-items-center'}>
            <div className={'flex flex-col items-center gap-4'}>
                <CircleAlert className={'motion-preset-oscillate text-orange-400 icon-md'} />
                <span className={'font-semibold text-lg'}>Error</span>
                <span className={'text-secondary-foreground font-medium text-xs break-words max-w-md'}>{error.message}</span>
                <div className={'flex justify-center gap-4'}>
                    <Button onClick={handleRetry}>Try again</Button>
                </div>
            </div>
        </div>
    );
}