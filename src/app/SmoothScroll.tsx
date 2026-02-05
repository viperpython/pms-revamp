'use client';
import {ReactLenis,useLenis} from 'lenis/react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SmoothScroll({ children }: { children: React.ReactNode }){
    const lenis = useLenis();
    const pathname = usePathname();

    useEffect(() => {
        lenis?.scrollTo(0, { immediate: true });
    },[pathname,lenis]);
    return(
        <ReactLenis root options={{ lerp: 0.5, duration: 1.5 }}>
            {children}
        </ReactLenis>
    );
}