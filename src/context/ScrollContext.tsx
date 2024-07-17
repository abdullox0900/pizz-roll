// ScrollContext.tsx
import React, { createContext, ReactNode, useRef } from 'react'

interface ScrollContextType {
    homeRef: React.RefObject<HTMLDivElement>
    burgersRef: React.RefObject<HTMLDivElement>
    snacksRef: React.RefObject<HTMLDivElement>
    scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const homeRef = useRef<HTMLDivElement>(null)
    const burgersRef = useRef<HTMLDivElement>(null)
    const snacksRef = useRef<HTMLDivElement>(null)

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <ScrollContext.Provider value={{ homeRef, burgersRef, snacksRef, scrollToSection }}>
            {children}
        </ScrollContext.Provider>
    )
}

export { ScrollContext, ScrollProvider }

