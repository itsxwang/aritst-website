// handleCart.ts

type cartItem = { _id: string; quantity: number };

import { fetchArt, fetchAllArtoworks } from "./handleArtworks";

const getCartFromStorage = (): cartItem[] => {
    const cartJson = localStorage.getItem("cartItem");
    return cartJson ? JSON.parse(cartJson) : [];
};

export async function addToCart(_id: string, quantityToAdd: number) {
    const artwork = await fetchArt(_id);
    if (!artwork) throw new Error("Artwork not found");

    const cart = getCartFromStorage();
    const cartItem = cart.find((item) => item._id === _id);
    const currentQuantityInCart = cartItem?.quantity || 0;

    // ✅ FIX: Reconstruct the original total stock before validating.
    // Original Total Stock = (Stock left in DB) + (What's currently in our cart)
    const originalTotalStock = artwork.stock_quantity;

    // Now, validate against the original total stock.
    if (currentQuantityInCart >= originalTotalStock) {
        console.warn("Not enough stock available. Total stock is", originalTotalStock);
        return;
    }



    let updatedCart;
    if (cartItem) {
        updatedCart = cart.map((item) =>
            item._id === _id ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
    } else {
        updatedCart = [...cart, { _id, quantity: quantityToAdd }];
    }
    localStorage.setItem("cartItem", JSON.stringify(updatedCart));
}

export async function removeFromCart(_id: string, quantityToRemove: number) {
    // This function logic was correct and remains the same
    const artwork = await fetchArt(_id);
    if (!artwork) throw new Error("Artwork not found");

    const cart = getCartFromStorage();
    const cartItem = cart.find((item) => item._id === _id);
    if (!cartItem) return;

    const isFullRemoval = quantityToRemove >= cartItem.quantity;



    let updatedCart;
    if (isFullRemoval) {
        updatedCart = cart.filter((item) => item._id !== _id);
    } else {
        updatedCart = cart.map((item) =>
            item._id === _id ? { ...item, quantity: item.quantity - quantityToRemove } : item
        );
    }
    localStorage.setItem("cartItem", JSON.stringify(updatedCart));
}

export async function fetchCart() {
    const artworks = await fetchAllArtoworks();
    const cartData = getCartFromStorage();

    const cartItems = artworks
        .map((artwork) => {
            const cartItem = cartData.find((item) => item._id === artwork._id);
            if (!cartItem) return null;

            // ✅ FIX: Add a 'total_stock' property for the UI to use.
            const total_stock = artwork.stock_quantity + cartItem.quantity;

            return {
                ...artwork,
                quantity: cartItem.quantity,
                total_stock: total_stock, // Pass the correct total stock to the UI
            };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

    return cartItems;
}

//! in 1st time  we have to sync the stock quantity data with the UI, so user can't add to cart again if stock quantity is 0, so we have to change flow