import { useState, useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom";
import { getCart,incrsQty,dcrsQty,removeFromCart,addToWishList } from "../utils/Storage"
import ShopContext from "../context/ShopContext"
import { AddressContext } from "../context/AddressContext";

export default function Cart(){
    const[cartItems,setCartItems]=useState([])
    const{ updateCartCount, updateWishListCount}=useContext(ShopContext);
    const{address,selectAddress}=useContext(AddressContext)
    const[orderPlaced,setOrderPlaced]=useState(false)

    const { incrementQuantity, decrementQuantity, removeItemFromCart, addItemToWishList } = useContext(ShopContext);

    const selected = address.find((addr)=>addr.id === selectAddress)

    const navigate = useNavigate();

    useEffect(()=>{
        const cart = getCart();
        setCartItems(cart);
    },[]);

    const handleIncrease =(id)=>{
        incrementQuantity(id);
        setCartItems(getCart())
    }

    const handleDecrease=(id)=>{
        decrementQuantity(id);
        setCartItems(getCart());
    }

    const handleRemove = (id)=>{
        removeItemFromCart(id)
        setCartItems(getCart())
    }
    const handleMoveToWishList=(item)=>{
        addItemToWishList(item)
        removeItemFromCart(item._id)
        setCartItems(getCart())
    }

    const handleCheckout = async () => {
        if (!selected) {
            alert("Please select an address");
            return;
        }

        const currentId = "691db67da27d895cb07c0612"; // your userId placeholder

        const orderData = {
                userId: currentId,
                items: cartItems.map(item => ({
                productId: item._id,
                qty: item.qty,
                price: item.price
            })),
            address: {
                fullAddress: selected.addressPlace,
                pincode: selected.pincode
            },
                totalAmount: cartItems.reduce((sum, itm) => sum + itm.price * itm.qty, 0)
        };

        try {
            const response = await fetch("https://ecommerce-website-backend-umber.vercel.app/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Order saved in DB:", result.order);

                alert("Order Placed Successfully"); // show success message

                // clear cart but keep your cart logic intact
                localStorage.removeItem("cart");
                setCartItems([]);
                updateCartCount();
                setOrderPlaced(true);
            } else {
                alert("Failed to place order");
            }
        } catch (error) {
            console.log("Order Failed", error);
            alert("Something went wrong");
        }
};

    const totalPrice = cartItems.reduce((sum,item)=>sum+item.price*item.qty,0);
    const totalQty = cartItems.reduce((sum,item)=> sum+item.qty,0)
    return(
        <div className="container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? ( <p>Your cart is empty</p> ) : (
                <div className="row">
                        {/* Cart Item List */}
                    <div className="col-md-8">
                        {cartItems.map((item)=>(
                            <div key={item.id} className="card mb-3 p-3 d-flex flex-row gap-3">
                                <img src={item.image} alt={item.category} 
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                />
                                <div className="flex-grow-1">
                                    <h6>{item.details}</h6>
                                    <p>₹{item.price}</p>
                                    <span style={{ textDecoration: "line-through", color: "gray" , marginLeft: "8px", fontSize:"0.85rem"}}>
                                        ₹499
                                    </span>
                                    <span style={{ display:"block", color: "gray", fontSize: "0.8rem", marginTop: "2px"  }}>
                                        50% off
                                    </span>
                                     <div className="d-flex align-items-center gap-2">
                                        <button className="btn btn-sm btn-outline-secondary"
                                            onClick={() => handleDecrease(item._id)}>-</button>
                                        
                                        <span>{item.qty}</span>

                                        <button className="btn btn-sm btn-secondary"
                                            onClick={() => handleIncrease(item._id)}>+</button>
                                    </div>
                                    <div className="mt-2 d-flex gap-3">
                                        <button className="btn btn-sm btn-secondary"
                                            onClick={() => handleRemove(item._id)}>Remove</button>

                                        <button className="btn btn-sm btn-outline-secondary"
                                            onClick={() => handleMoveToWishList(item)}>
                                            Move to Wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* price summary */}
                    <div className="col-md-4">
                        {selected && (
                            <div className="card p-3 mb-3">
                                <h6>Deliver to:</h6>
                                <p style={{margin:0}}>Name:<strong>{selected.name}</strong></p>
                                <p style={{margin:0}}>Address:<strong>{selected.addressPlace}</strong></p>
                                <p style={{margin:0}}>Phone Number: <strong>{selected.phone}</strong></p>
                                <p style={{margin:0}}>Pincode: <strong>{selected.pincode}</strong></p>
                                <button  className="btn btn-outline-secondary btn-sm mt-2"
                                    onClick={()=>navigate("/address")}
                                >
                                    Change Address
                                </button>
                            </div>
                        )}
                        <div className="card p-3">
                            <h5>Price Details</h5>
                            <hr />
                            <p>Total Items: {totalQty}</p>
                            <p>Total Price: ₹{totalPrice}</p>
                            {!selected && (
                                <button onClick={() => navigate("/address")} className="btn btn-secondary w-100 mb-2">
                                    Select Delivery Address
                                </button>
                            )}

                            <button className="btn btn-primary w-100" onClick={handleCheckout}>
                                Checkout ₹{totalPrice}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}