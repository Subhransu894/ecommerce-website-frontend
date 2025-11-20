import { products } from "../pages/Products";

//Cart
export const getCart=()=>{
    return JSON.parse( localStorage.getItem("cart")) || [];
}
export const saveCart=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart))
}

export const addToCart=(product)=>{
    const cart=getCart();
    const exists = cart.find(item => item.id === product.id);

    if (exists) {
        exists.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart(cart)
    return cart;

}

export const incrsQty=(id)=>{
    const cart=getCart();
    const item = cart.find((p)=>p.id === id) 
    if(item){
        item.qty += 1;
    }
    saveCart(cart);
}
export const dcrsQty=(id)=>{
    const cart=getCart();
    const item = cart.find((p)=>p.id === id)
    if(item && item.qty>1){
        item.qty -= 1
    }
    saveCart(cart)
}
export const removeFromCart =(id)=>{
    let cart = getCart();
    cart = cart.filter((item)=> item.id !== id);
    saveCart(cart);
}

//wishlist
export const getWishList=()=>{
    return JSON.parse(localStorage.getItem("wishlist"))||[];
}
export const saveWishList=(wishlist)=>{
    localStorage.setItem("wishlist",JSON.stringify(wishlist))
}

export const addToWishList=(product)=>{
    const wishlist = getWishList();
    const exists = wishlist.find((item)=>item.id === product.id)

    if(!exists){
        wishlist.push(product);
        saveWishList(wishlist)
    }
}
export const removeWishList=(id)=>{
    let wishlist = getWishList()
    wishlist = wishlist.filter((item)=> item.id !== id)
    saveWishList(wishlist);
    return wishlist;
}