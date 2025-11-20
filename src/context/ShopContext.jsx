import { createContext } from "react";
import { useState } from "react";
import { getCart,getWishList } from "../utils/Storage";
import { toast } from "react-toastify";
import { addToCart as storageAddTocart,
    removeFromCart as storageRemoveFromCart,
    incrsQty as storageIncrsQty,
    dcrsQty as storageDcrsQty,
    addToWishList as storageAddToWishList,
    removeWishList as storageRemoveWishList
 } from "../utils/Storage";

const ShopContext = createContext()

export function ShopProvider({children}){
    const[cartCount,setCartCount]=useState(getCart().length);
    const[wishListCount,setWishListCount]=useState(getWishList().length);
    const[searchItem,setSearchItem]=useState("")

    const updateCartCount = () => {
        setCartCount(getCart().length);
    };

    const updateWishListCount = () => {
        setWishListCount(getWishList().length);
    };

    //cart alert messages
    const addItemToCart = (Prod)=>{
        storageAddTocart(Prod);
        updateCartCount();
        toast.success(`${Prod.details} added to cart`)
    }
    const removeItemFromCart=(Prod)=>{
        storageRemoveFromCart(Prod);
        updateCartCount();
        toast.error(`${Prod.details} remove from cart`)
    }
    const incrementQuantity = (id)=>{
        storageIncrsQty(id)
        updateCartCount();
        toast.info(`Quantity increased`)
    }
    const decrementQuantity = (id)=>{
        storageDcrsQty(id);
        updateCartCount();
        toast.info(`Quantity decreased`)
    }
    //wishlist alert messages
    const addItemToWishList=(Prod)=>{
        storageAddToWishList(Prod);
        updateWishListCount();
        toast.success(`${Prod.details} added to wishList`)
    }
    const removeItemFromWishList=(Prod)=>{
        storageRemoveWishList(Prod);
        updateWishListCount();
        toast.error(`${Prod.details} remove from wishList`)
    }
    return(
        <ShopContext.Provider value={{
            cartCount,updateCartCount,wishListCount,updateWishListCount,searchItem,setSearchItem,
            addItemToCart,removeItemFromCart,incrementQuantity,decrementQuantity,addItemToWishList,removeItemFromWishList
            }}
        >
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContext;