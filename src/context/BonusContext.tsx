import React, { createContext, ReactNode, useContext, useState } from 'react'

interface BonusContextType {
    useBonus: boolean
    setUseBonus: (value: boolean) => void
}

const BonusContext = createContext<BonusContextType | undefined>(undefined)

export const BonusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [useBonus, setUseBonus] = useState(false)

    return (
        <BonusContext.Provider value={{ useBonus, setUseBonus }}>
            {children}
        </BonusContext.Provider>
    )
}

export const useBonus = () => {
    const context = useContext(BonusContext)
    if (context === undefined) {
        throw new Error('useBonus must be used within a BonusProvider')
    }
    return context
}
