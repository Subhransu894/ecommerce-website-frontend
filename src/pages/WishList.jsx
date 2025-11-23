import { useContext, useEffect, useState } from "react"
import { getWishList,addToWishList,removeWishList, addToCart } from "../utils/Storage"
import ShopContext from "../context/ShopContext"
export default function WishList(){
    const[wishList,setWishList]=useState([])
    const {updateCartCount,updateWishListCount}=useContext(ShopContext);

    const{addItemToCart,removeItemFromWishList}=useContext(ShopContext)
    useEffect(()=>{
        setWishList(getWishList());
    },[])
    const handleMoveToCart=(item)=>{
        // 1. Add to cart
        addItemToCart(item)
        
        // 2. remove from wishist
        removeItemFromWishList(item._id)
        
        //update component ui
        setWishList(getWishList())
    }
    const handleRemove=(id)=>{
        removeItemFromWishList(id)
        setWishList(getWishList())
    }
    
    return(
        <div className="container">
            <h2>Your wishlist</h2>
            {wishList.length === 0 ? ( <p>No products found</p> ) :
                <div className="row g-3">
                    {wishList.map((item)=>(
                        <div key={item._id} className="col-6 col-md-4 col-lg-3">
                            <div className="card h-100 d-flex flex-column p-2">
                                <img src={item.image} alt={item.category} className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <p className="text-center mt-2">{item.details}</p>
                                <p className="text-center">₹{item.price}</p>
                                <div className="mt-auto">
                                    <button className="btn btn-secondary w-100" onClick={()=>handleMoveToCart(item)}>Move to Cart</button>
                                    <button className="btn btn-danger w-100" onClick={()=>handleRemove(item._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}