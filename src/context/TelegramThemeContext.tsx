// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// interface TelegramTheme {
//     backgroundColor: string
//     textColor: string
//     hintColor: string
//     linkColor: string
//     buttonColor: string
//     buttonTextColor: string
//     secondaryBackgroundColor: string
// }

// interface TelegramThemeContextType {
//     theme: TelegramTheme
//     colorScheme: 'light' | 'dark'
// }

// const TelegramThemeContext = createContext<TelegramThemeContextType | undefined>(undefined)

// export const useTelegramTheme = () => {
//     const context = useContext(TelegramThemeContext)
//     if (!context) {
//         throw new Error('useTelegramTheme must be used within a TelegramThemeProvider')
//     }
//     return context
// }

// interface TelegramThemeProviderProps {
//     children: ReactNode
// }

// export const TelegramThemeProvider: React.FC<TelegramThemeProviderProps> = ({ children }) => {
//     const [theme, setTheme] = useState<TelegramTheme>({
//         backgroundColor: '#ffffff',
//         textColor: '#000000',
//         hintColor: '#999999',
//         linkColor: '#0088cc',
//         buttonColor: '#0088cc',
//         buttonTextColor: '#ffffff',
//         secondaryBackgroundColor: '#f1f1f1',
//     })

//     const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')

//     useEffect(() => {
//         const tg = window.Telegram.WebApp

//         const updateTheme = () => {
//             setTheme({
//                 backgroundColor: tg.backgroundColor,
//                 textColor: tg.textColor,
//                 hintColor: tg.hintColor,
//                 linkColor: tg.linkColor,
//                 buttonColor: tg.buttonColor,
//                 buttonTextColor: tg.buttonTextColor,
//                 secondaryBackgroundColor: tg.secondaryBackgroundColor,
//             })
//             setColorScheme(tg.colorScheme)
//         }

//         tg.ready()
//         updateTheme()
//         tg.onEvent('themeChanged', updateTheme)

//         return () => {
//             tg.offEvent('themeChanged', updateTheme)
//         }
//     }, [])

//     return (
//         <TelegramThemeContext.Provider value={{ theme, colorScheme }}>
//             {children}
//         </TelegramThemeContext.Provider>
//     )
// }