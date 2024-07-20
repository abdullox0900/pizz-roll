import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface Product {
    product_name: string
    product_img: string
    product_price: string
    product_urls: string[]
    product_discount: string
    product_description: string
    productId: string
}

interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (id: string) => void
    updateItem: (id: string, newItem: CartItem) => void
    clearCart: () => void
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        // Initialize state from localStorage
        const savedItems = localStorage.getItem('cartItems')
        return savedItems ? JSON.parse(savedItems) : []
    })

    useEffect(() => {
        // Update localStorage whenever items change
        localStorage.setItem('cartItems', JSON.stringify(items))
    }, [items])

    const addItem = (product: Product) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.productId === product.productId)
            if (existingItem) {
                return prevItems.map(item =>
                    item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevItems, { ...product, quantity: 1 }]
        })
    }

    const removeItem = (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.productId !== id))
    }

    const updateItem = (id: string, newItem: CartItem) => {
        setItems(prevItems => prevItems.map(item =>
            item.productId === id ? newItem : item
        ))
    }

    const clearCart = () => {
        setItems([])
    }

    const total = items.reduce((sum, item) => sum + parseFloat(item.product_price) * item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateItem, clearCart, total }}>
            {children}
        </CartContext.Provider>
    )
}

// Karzinka kontekstini ishlatish uchun hook
export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}