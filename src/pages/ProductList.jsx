import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { products } from "./Products";
// import { useLocalFetch } from "../hooks/useLocalFetch";
import { useFetch } from "../hooks/useFetch";

import { addToCart,addToWishList,getWishList } from "../utils/Storage";

import ShopContext from "../context/ShopContext";

export default function ProductList(){
    const {category}=useParams();
    const {searchItem}=useContext(ShopContext)

    const [price,setPrice]=useState(400);
    const[selectedCategory,setSelectedCategory]=useState([])
    const[newRating,setNewRating]=useState("")
    const[sortBy,setSortBy]=useState("lowToHigh")

    const [showFilters,setShowFilters] = useState(false)
    
    const{  cartCount, wishListCount,addItemToCart,addItemToWishList,removeItemFromWishList }=useContext(ShopContext)

    // const {data:products,loading,error}=useLocalFetch()
    const{ data,loading,error} = useFetch("https://ecommerce-website-backend-umber.vercel.app/api/products")

    const products = data?.datas?.products || [];

    

    const {updateCartCount,updateWishListCount}=useContext(ShopContext)

    if(loading)return ( <p className="text-center mt-3">Loading...</p> )
    if(error) return ( <p className="text-center mt-3">Error: {error}</p> )

    const handleChange=(e,cat)=>{
        if(e.target.checked){
            setSelectedCategory([...selectedCategory,cat])
        }else{
            setSelectedCategory(selectedCategory.filter((c)=>c !== cat))
        }
    }

    const handleCartClick = (item) => {
        addItemToCart(item); // adds item to cart & updates counter via context
    };

    const handleWishClick = (item) => {
        const wishList = getWishList(); // get current wishlist
        const exists = wishList.some(p => p._id === item._id);

        if (exists) {
            removeItemFromWishList(item._id); // remove from wishlist + update counter
        } else {
            addItemToWishList(item); // add to wishlist + update counter
        }
    };



    const clearFilters=()=>{
        setSelectedCategory([])
        setNewRating(null)
        setSortBy("")
        setPrice(400)
    }

    // console.log(products);
    console.log("RAW DATA:", data);
    console.log("FIRST ITEM:", data?.[0]);
    console.log("KEYS:", data?.[0] ? Object.keys(data[0]) : "no keys");



    let filteredProducts = products.filter((prod)=>{
         // Search filter
        const searchMatch = !searchItem || prod.details.toLowerCase().includes(searchItem.toLowerCase());

        // Category filter
        let categoryMatch = true;

        // If URL has a category, start with that
        if (category) {
            categoryMatch = prod.category.toLowerCase() === category.toLowerCase();
        }

        // If any checkbox is selected, override / extend the category filter
        if (selectedCategory.length > 0) {
            categoryMatch = selectedCategory
                .map(c => c.toLowerCase())
                .includes(prod.category.toLowerCase());
        }

        // Rating filter
        const ratingMatch = newRating ? prod.rating >= Number(newRating) : true;

        // Price filter
        const priceMatch = prod.price <= Number(price)

        return searchMatch && categoryMatch && ratingMatch && priceMatch;
    })
    // console.log(filteredProducts)
    
    let finalProduct = [...filteredProducts]

     //price sorting
     if(sortBy === "lowToHigh"){
        finalProduct.sort((a,b)=>a.price - b.price)
     }else if(sortBy === "highToLow"){
        finalProduct.sort((a,b)=>b.price - a.price)
     }
    return(
        <>
            <div className="container mt-4">
                {/* mobile filter button */}
                <div className="d-md-none mb-3">
                    <button className="btn btn-dark w-100" onClick={()=>setShowFilters(!showFilters)}>
                        <i className="bi bi-funnel"></i>{" "}
                        {showFilters ? "HideFilters" : "Show Filters"}
                    </button>
                </div>
                <div className="row">
                    <div className={`col-12 col-lg-3 mb-4 ${showFilters ? "d-block" : "d-none d-lg-block"}`}>
                        <div className="p-3 bg-light rounded shadow-sm">
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-3">Filters</h5>
                                <Link style={{color:"inherit"}} onClick={clearFilters}>clear</Link>
                            </div>

                            {/* price */}
                            <div className="mb-4">
                                <h5>Price Range</h5>
                                <input type="range" 
                                min="100"
                                max="400"
                                value={price} 
                                onChange={(e)=>setPrice(e.target.value)} className="form-range"
                                />
                                <div className="d-flex justify-content-between">
                                    <span>100</span>
                                    <span>Maximum: {price}</span>
                                    <span>400</span>
                                </div> 
                            </div>
                            {/* category */}
                            <div className="mb-4">
                                <h5>Category</h5>
                                {["men","women","children","accessories"].map((cat)=>(
                                    <div key={cat} className="form-check">
                                        <input type="checkbox" 
                                            id={cat} className="form-check-input" 
                                            checked={selectedCategory.includes(cat)} 
                                            onChange={(e)=>handleChange(e,cat)}
                                        />
                                        <label htmlFor={cat} className="form-check-label">{cat}</label>
                                    </div>
                                ))}
                            </div>
                            {/* rating */}
                            <div className="mb-4">
                                <h5>Rating</h5>
                                {[4,3,2,1].map((r)=>(
                                    <div className="form-check">
                                        <input 
                                        type="radio" 
                                        name="rating" 
                                        id={`rating-${r}`} 
                                        className="form-check-input"
                                        value={r}
                                        checked={Number(newRating) === r}
                                        onChange={(e)=>setNewRating(e.target.value)}
                                        />
                                        <label htmlFor={`rating-${r}`}>{r} & above</label>
                                    </div>
                                ))}
                            </div>
                            {/* Sort by */}
                            <div className="mb-4">
                                <h5>sort by</h5>
                                    <div>
                                        <input type="radio" id="lowToHigh"  
                                        name="sortBy" 
                                        value="lowToHigh" 
                                        checked={sortBy === "lowToHigh"}
                                        onChange={(e)=>{
                                            setSortBy(e.target.value)  
                                        }}
                                        />{" "}
                                        <label htmlFor="lowToHigh">price: lowToHigh</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="sortBy" 
                                        id="highToLow" 
                                        value="highToLow" 
                                        checked={sortBy === "highToLow"}
                                        onChange={(e)=>{
                                            setSortBy(e.target.value)  
                                        }}
                                        />{" "}
                                        <label htmlFor="highToLow">price: highToLow</label>
                                    </div>
                            </div>
                        </div>
                    </div>
                
                {/* Card-grid */}
                    <div className="col-12 col-lg-9">
                        <h2 className="mb-4">showing {category}'s apparel colllections</h2>
                        {console.log(category)}
                        <div className="row g-3">
                            {finalProduct.length > 0 ? (finalProduct.map((item)=>{
                                const isInWishlist = getWishList().some(w => w._id === item._id);
                                return(
                                    <div key={item._id} className="col-6 col-md-4 col-lg-3 ">
                                    <div className="card h-100 d-flex flex-column justify-content-between" style={{borderRadius:"0px"}}>
                                        <Link to={`/products/details/${item._id}`} style={{textDecoration:"none",color:"inherit",}}>
                                            <div style={{pointerEvents:"none"}}>
                                                <img src={item.image} alt={item.category} className="card-img-top" 
                                                    style={{height:"220px",objectFit:"cover",borderRadius:0}}
                                                />
                                                <div className="card-body " style={{padding: "8px 10px",}}>
                                                    <p className="card-text" 
                                                        style={{ fontSize: "0.9rem" ,
                                                                marginBottom:"8px",
                                                                minHeight: "48px",
                                                                lineHeight: "1.2rem",}}
                                                    >
                                                        {item.details}
                                                    </p>
                                                    <p className="mb-1 fw-bold" style={{ fontSize: "0.9rem" }}>₹ {item.price}{"  "}
                                                    <span style={{ textDecoration: "line-through", color: "gray" , marginLeft: "8px", fontSize:"0.85rem"}}>
                                                        ₹499
                                                    </span>
                                                    <span style={{ display:"block", color: "gray", fontSize: "0.8rem", marginTop: "2px"  }}>
                                                        50% off
                                                    </span>
                                                    </p>
                                                    <p className="card-text mt-2" style={{ fontSize: "0.85rem" }}>
                                                        ⭐️ {Number.isInteger(item.rating) ? item.rating : item.rating.toFixed(1)}
                                                    </p>   
                                                </div>
                                            </div>
                                        </Link>  
                                        <div className="mt-0" style={{pointerEvents:"auto"}}>
                                            <button className="btn btn-primary btn-sm w-100" style={{borderRadius:0,marginTop: "4px" }}
                                                    onClick={()=>handleCartClick(item)}
                                            >
                                                Add to Cart
                                            </button>
                                            <button className="btn btn-secondary btn-sm w-100" style={{borderRadius:0,marginTop: "0" }}
                                                    onClick={()=>handleWishClick(item)}
                                            >
                                                {isInWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
                                            </button>
                                        </div>   
                                    </div>
                                           
                                </div>
                                );  
                                
                            })) :  ( <p>No products available for {category}</p> )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}