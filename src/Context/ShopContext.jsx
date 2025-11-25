import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [all_product, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [wishlistItems, setWishlistItems] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                // Map backend data to frontend structure
                if (data && Array.isArray(data.products)) {
                    const mappedProducts = data.products.map(product => ({
                        ...product,
                        id: product._id,
                        new_price: product.price,
                        old_price: product.price * 1.2 // Simulating old price for now
                    }));
                    setAllProduct(mappedProducts);
                } else {
                    console.warn("Received unexpected data format from API:", data);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCount = (prev[itemId] || 0) - 1;
            if (newCount <= 0) {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            }
            return { ...prev, [itemId]: newCount };
        })
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === item)
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.new_price;
                }
            }
        }
        return totalAmount
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem
    }

    const addToWishlist = (itemId) => {
        setWishlistItems((prev) => ({ ...prev, [itemId]: true }))
    }

    const removeFromWishlist = (itemId) => {
        setWishlistItems((prev) => {
            const newWishlist = { ...prev };
            delete newWishlist[itemId];
            return newWishlist;
        })
    }

    const contextValue = {
        all_product,
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        getTotalCartAmount,
        getTotalCartItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;