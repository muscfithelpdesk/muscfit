'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartService } from '@/lib/services/cartService';

const CartContext = createContext({});

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export function CartProvider({ children }) {
    const { user, loading: authLoading } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Load cart on mount or user change
    useEffect(() => {
        let mounted = true;

        const loadCart = async () => {
            try {
                setLoading(true);
                if (user) {
                    // Load from DB
                    const items = await cartService.getCart(user.id);
                    if (mounted) setCartItems(items);
                } else {
                    // Load from LocalStorage
                    const saved = localStorage.getItem('muscfit_cart');
                    if (saved) {
                        try {
                            if (mounted) setCartItems(JSON.parse(saved));
                        } catch (e) {
                            console.error('Failed to parse cart', e);
                        }
                    } else {
                        if (mounted) setCartItems([]);
                    }
                }
            } catch (error) {
                console.error('Error loading cart:', error);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        if (!authLoading) {
            loadCart();
        }

        return () => {
            mounted = false;
        };
    }, [user, authLoading]);

    // Sync to LocalStorage if guest
    useEffect(() => {
        if (!user && !loading) {
            localStorage.setItem('muscfit_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, user, loading]);

    const addToCart = async (product, quantity = 1) => {
        // Optimistic update
        const previousItems = [...cartItems];

        // Check if item exists
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        let newItems;

        if (existingItemIndex > -1) {
            newItems = [...cartItems];
            newItems[existingItemIndex].quantity += quantity;
        } else {
            newItems = [...cartItems, { ...product, quantity }];
        }

        setCartItems(newItems);
        setIsSidebarOpen(true); // Open cart sidebar/dropdown on add

        try {
            if (user) {
                await cartService.addToCart(user.id, product.id, quantity);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            setCartItems(previousItems); // Revert
            // Show error toast here ideally
        }
    };

    const removeFromCart = async (productId) => {
        const previousItems = [...cartItems];
        setCartItems(prev => prev.filter(item => item.id !== productId));

        try {
            if (user) {
                await cartService.removeFromCart(user.id, productId);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            setCartItems(previousItems);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const previousItems = [...cartItems];
        setCartItems(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ));

        try {
            if (user) {
                await cartService.updateQuantity(user.id, productId, newQuantity);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            setCartItems(previousItems);
        }
    };

    const clearCart = async () => {
        const previousItems = [...cartItems];
        setCartItems([]);
        try {
            if (user) {
                await cartService.clearCart(user.id);
            } else {
                localStorage.removeItem('muscfit_cart');
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            setCartItems(previousItems);
        }
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        loading,
        isSidebarOpen,
        setIsSidebarOpen
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
