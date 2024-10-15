import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface Product {
    name: string
    price: number
    description: string
    id: number
    categoryId: number
    createdAt: string
}

interface CartItem {
    _id: string  // Bu pizzaId sifatida ishlatiladi
    name: string
    price: number
    quantity: number
    description: string
    id: number
    categoryId: number
    createdAt: string
    imageUrl?: string  // Agar rasmlar ham bo'lsa
}

interface CartContextType {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (id: number) => void
    updateItem: (id: number, newItem: CartItem) => void
    clearCart: () => void
    total: number
    addToCart: (product: Product) => void  // Bu qatorni qo'shing
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const savedItems = localStorage.getItem('cartItems')
            return savedItems ? JSON.parse(savedItems) : []
        } catch (error) {
            console.error('Failed to parse cart items from localStorage:', error)
            return []
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(items))
        } catch (error) {
            console.error('Failed to save cart items to localStorage:', error)
        }
    }, [items])

    const addItem = (product: Product) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id)
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevItems, { ...product, _id: product.id?.toString(), quantity: 1 }]
        })
    }

    const removeItem = (id: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    const updateItem = (id: number, newItem: CartItem) => {
        setItems(prevItems => prevItems.map(item =>
            item.id === id ? newItem : item
        ))
    }

    const clearCart = () => {
        setItems([])
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // addToCart funksiyasini addItem funksiyasiga yo'naltiring
    const addToCart = addItem

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateItem, clearCart, total, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
