// import { products } from "./Products";
import { useParams } from "react-router-dom"
import { useContext, useState } from "react";
import { getWishList,addToWishList,removeWishList,addToCart } from "../utils/Storage";
import ShopContext from "../context/ShopContext";
// import { toast } from "react-toastify";
import { useFetch } from "../hooks/useFetch";

export default function ProductDetails(){
    const Sizes=['S','M','L','XL'];
    const {id}=useParams();

    const[size,setSize]=useState("")
    const[quantity,setQuantity]=useState(1)

    const { data, loading, error } = useFetch("https://ecommerce-website-backend-umber.vercel.app/api/products");
    const products = data?.datas?.products || [];

    const prod = products.find((p)=> p._id === id)

     const {
        updateCartCount,
        updateWishListCount,
        addItemToCart,
        addItemToWishList,
        incrementQuantity,
        decrementQuantity,
        removeItemFromWishList,
    } =useContext(ShopContext)

    const [wishIds,setWishIds]=useState(()=> getWishList().map((item)=> item._id ))

    if (loading) return <h2 className="text-center mt-4">Loading product...</h2>;
    if (error) return <h2 className="text-center mt-4 text-danger">{error}</h2>;
    if (!prod) return <h2 className="text-center mt-4">No Product is there</h2>;
    // console.log(prod);

    
    // const wishList = getWishList()
    // const isWishListed = wishList.some((p)=> p._id === prod.id)
    // console.log(isWishListed)
    // const handleWishToggle=()=>{
    //     if(isWishListed){
    //         removeWishList(prod.id)
    //     }else{
    //         addToWishList(prod)
    //     }
    //     updateWishListCount()
    // }
 
    const toggleWish=(prod)=>{
        if(wishIds.includes(prod._id)){
            removeItemFromWishList(prod._id)
            setWishIds(prev=>prev.filter((id)=>id !== prod._id))
        }else{
            addItemToWishList(prod)
            setWishIds(prev=>[...prev,prod._id]);  
        }
        updateWishListCount()
    }

   
    const handleIncr = () => {
        incrementQuantity(prod._id);
        setQuantity(prev => prev + 1);
    };
    const handleDecr = () => {
        if (quantity > 1) {
            decrementQuantity(prod._id);
            setQuantity(prev => prev - 1);
        }
    };
    
    //stars pattern
    const renderStar=(rating)=>{
            rating=Number(rating)
            const full = Math.floor(rating);
            const decimal=rating-full;
            return(
                <> 
                    {/* //full stars */}
                    {Array.from({length:full}).map((item,i)=>(
                        <i key={i}
                            className="bi bi-star-fill"
                            style={{ color: "gold", marginRight: "4px" }}
                        ></i>
                    ))}
                    {/* decimal */}
                    {decimal>0 && (
                        <i  className="bi bi-star-fill"
                            style={{
                                color: `rgba(255, 215, 0, ${decimal})`,
                                marginRight: "4px",
                            }}
                        ></i>
                    )}
                </>
            )
        }
    return(
        <>
            <div className="container py-5">
                <div className="row">
                    {/* left-side */}
                    <div className="col-12 col-lg-5 mb-4">
                        <div className="position-relative" style={{ width: "100%", height: "400px",maxHeight:"500px" }} >
                            <img src={prod.image} alt={prod.category} className="w-100 h-100" style={{ objectFit: "cover" }}/>
                            <i className={`bi ${wishIds.includes(prod._id) ? "bi-heart-fill text-danger" : "bi-heart"}`}
                                style={{ 
                                    position: "absolute",
                                    top: "12px",
                                    right: "12px", 
                                    fontSize: "1.4rem", 
                                    zIndex: 20 ,
                                    background: "white",
                                    borderRadius: "50%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    lineHeight: 0,          // fixes vertical misalignment
                                    transform: "translateY(2px)"
                                }}
                                onClick={()=>toggleWish(prod)}
                            ></i>
                        </div>
                        <button className= "btn  btn-secondary w-100 mt-3" onClick={()=>{
                            addItemToCart(prod)
                            updateCartCount()
                            }}>Add to Cart</button>
                    </div>
                    {/* right side */}
                     <div className="col-12 col-lg-7">
                        <h5 className="fs-2 fs-md-3 mb-2" >{prod.details}</h5>
                        {/* <p>{prod.rating}</p> */}
                        <div className="d-flex align-items-center mb-2 mt-2">
                            <span style={{ marginLeft: "6px",marginRight:"6px"}}>
                                {prod.rating}
                            </span>
                           {renderStar (Number (prod.rating))}
                        </div>
                        {/* price off and dis */}
                        <div style={{ marginBottom: "8px" , marginTop:"10px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                    ₹{prod.price}
                                </span>
                                <span style={{ color: "gray", textDecoration: "line-through" }}>
                                    ₹499
                                </span>
                            </div>
                            <div style={{ color: "gray" }}>
                                50% off
                            </div>
                        </div>
                        {/* quantity */}
                        <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                            <p style={{fontWeight:"bold",marginTop:"10px"}}>Quantity: </p>
                            <button className="btn btn-light border"
                                onClick={handleDecr}
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    padding: 0,
                                    borderRadius: "50%",
                                    fontSize: "1rem",
                                    lineHeight: 1,
                                    marginLeft:"12px"
                                }}
                            >
                                -
                            </button>
                            <button className="btn btn-sm border"
                                style={{
                                    minWidth: "35px",
                                    padding: "0 8px",
                                    borderRadius: "6px",
                                    fontSize: "0.9rem", 
                                    backgroundColor: "#f8f9fa",
                                    marginLeft:"12px"
                                }}
                            >
                                {quantity}
                            </button>
                            <button className="btn btn-light border"
                                onClick={handleIncr}
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    padding: 0,
                                    borderRadius: "50%",
                                    fontSize: "1rem",
                                    lineHeight: 1,
                                    marginLeft:"12px"
                                }}
                            >
                                +
                            </button>
                        </div>
                        {/* size */}
                        <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                            <p style={{fontWeight:"bold",marginTop:"10px"}}>Size: </p>
                            {Sizes.map((sz)=>(
                                <button key={sz}
                                    onClick={()=>setSize(sz)}
                                    style={{
                                        padding:"6px 12px",
                                        border:"1px solid #ccc",
                                        backgroundColor:  "white",
                                        color: size === sz ? "#0d6efd" : "inherit",
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                        minWidth: "36px",
                                        textAlign: "center",
                                        marginLeft: "12px"
                                    }}  
                                >
                                    {sz}
                                </button>
                            ))}
                        </div>
                        <hr />

                        {/* log and plocy phase */}
                        <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mt-3">
                             {/* 10-Day Return */}
                            <div style={{ textAlign: "center"}}>
                                <div
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        border: "1px solid #ccc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto",
                                        fontSize: "1.4rem",
                                        color: "inherit"
                                    }}
                                >
                                    <i className="bi bi-box"></i>
                                </div>
                                <span style={{ display: "block", marginTop: "6px", width: "70px",fontSize: "0.8rem" }}>
                                    10-Days returnable
                                </span>
                            </div>
                            {/* Pay on Delivery */}
                            <div style={{textAlign: "center"}}>
                                <div 
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        border: "1px solid #ccc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto",
                                        fontSize: "1.4rem",
                                        color:"inherit"
                                    }}
                                >
                                   <i className="bi bi-cash-stack"></i>
                                </div>
                                <span style={{display: "block", marginTop: "6px",width: "70px", fontSize: "0.8rem"}}>
                                    Pay on Delivery
                                </span>
                            </div>
                            {/* free delivery */}
                            <div style={{textAlign:"center"}}>
                                <div 
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        border: "1px solid #ccc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto",
                                        fontSize: "1.4rem",
                                        color:"inherit"
                                    }}
                                >
                                    <i className="bi bi-truck-front"></i>
                                </div>
                                <span style={{display:"block",marginTop:"6px",width: "70px",fontSize:"0.8rem"}}>
                                    Free Delivery
                                </span>
                            </div>
                            {/* secure payment */}
                            <div style={{textAlign:"center"}}>
                                <div 
                                    style={{
                                        width:"50px",
                                        height:"50px",
                                        borderRadius:"50%",
                                        border: "1px solid #ccc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto",
                                        fontSize: "1.4rem",
                                        color:"inherit"
                                    }}
                                >
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                                <span style={{display:"block",marginTop:"6px",width: "70px",fontSize:"0.8rem"}}>
                                    Secure Payment
                                </span>
                            </div>
                        </div>

                        <hr />

                        {/* description part */}
                        <div className="mt-4">
                            <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>Description: </h5>
                            <ul style={{ paddingLeft: "18px", lineHeight: "1.6" }}>
                                <li style={{ marginBottom: "2px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </li>
                                <li style={{ marginBottom: "2px" }}>It is a long established fact that a reader will be distracted by the 
                                    readable content of a page when looking at its layout, 
                                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                                </li>
                                <li style={{ marginBottom: "2px" }}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, 
                                    making it over 2000 years old.Richard McClintock.
                                </li>
                                <li style={{ marginBottom: "2px" }}>There are many variations of passages of Lorem Ipsum available, 
                                    but the majority have suffered alteration in some form, by injected humour, 
                                    or randomised words which don't look even slightly believable.
                                </li>
                                <li style={{ marginBottom: "2pxx" }}>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            {/* the bottom images */}
            
            <div className="container">
                <h5 style={{marginTop:"20px",marginBottom:"20px"}}>More items you may like in apparel</h5>
                <div className="row">
                    {products.map((item)=>(
                        <div className="col-6 col-md-4 col-lg-3 mb-4" key={item._id}>
                             {/* Image part */}
                            <div className="position-relative"
                                style={{ width: "100%", height: "350px", overflow: "hidden" }}
                            >
                                <img src={item.image} alt={item.category} className="w-100 h-100" style={{ objectFit: "cover" }}/>
                                <i 
                                    className={`bi ${wishIds.includes(item._id) ? "bi-heart-fill text-danger" : "bi-heart"}`}
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        right: "12px",
                                        fontSize: "1.3rem",
                                        zIndex: 20,
                                        background: "white",
                                        borderRadius: "50%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "35px",
                                        height: "35px",
                                        display: "flex"
                                    }}
                                    onClick={()=>toggleWish(item)}
                                ></i>
                            </div>
                            {/* text and button part */}
                            <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <p 
                                    style={{fontSize:"0.95rem",fontWeight:"500",marginBottom:"4px"}} 
                                >
                                    {item.details}
                                </p>

                                <p 
                                    style={{fontSize:"1rem",fontWeight:"bold",marginBottom:"4px"}}
                                >
                                    ₹{item.price}
                                </p>
                                <button className="btn btn-secondary w-100" onClick={()=>addItemToCart(item)}>
                                    Add to Cart
                                </button>
                            </div>  
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}