import { Link,useNavigate} from "react-router-dom"
// import { useEffect,useState } from "react"
// import { getWishList } from "../utils/Storage"
import ShopContext from "../context/ShopContext";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";

export default function Nav(){
    const {wishListCount,cartCount}=useContext(ShopContext)
    const{searchItem,setSearchItem}=useContext(ShopContext)

    //testing puropse to check is all ok->
    // const {user,token} = useAuth()
    // console.log(user);
    // console.log(token);

    const {user,logout} = useAuth()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        logout()
        navigate("/")
    }

    return(
        <>
            <nav className='navbar navbar-expand-lg bg-light shadow-sm'>
                <div className='container'>
                    {/* Logo */}
                    <Link to="/" className="navbar-brand fw-bold text-secondary" style={{textDecoration:"none", color:"gray"}}>
                            MySHoppingApp
                    </Link>
                    {/* hamburger */}
                    <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarContent"
                        >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar content */}
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <form className='position-relative mx-auto my-3 my-lg-0' style={{width:"100%",maxWidth:"320px"}}>
                                <i className='bi bi-search text-secondary position-absolute top-50 start-0 translate-middle-y ms-3'></i>
                                <input type="search" placeholder='Search' className="form-control ps-5"
                                style={{borderRadius:"25px" }} value={searchItem} onChange={(e)=>setSearchItem(e.target.value)}/>
                        </form>

                        {/* right section */}
                        <div  className="d-flex align-items-center gap-3 ms-lg-auto flex-wrap justify-content-center mt-3 mt-lg-0">
                        {!user ? (
                                <>
                                    <Link to="/login"  className="btn btn-secondary btn-sm text-decoration-none">
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn btn-outline-secondary btn-sm text-decoration-none">
                                        Register
                                    </Link>
                                </>
                        ):(
                                <>
                                    <span className="fw-semibold">Hello, {user.name}</span>
                                    <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                        )}

                        {/* WishList */}
                            <Link to="/wishlist" className="text-decoration-none text-dark position-relative">
                                <i className='bi bi-heart fs-5'></i>
                                {wishListCount > 0 && (
                                    <span 
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{fontSize: "0.7rem" }}
                                    > 
                                        {wishListCount}
                                    </span>
                                )}
                            </Link>

                            {/* cart */}
                            <Link to="/cart" className='text-decoration-none text-dark position-relative'>
                                <i className='bi bi-cart fs-5'></i>
                                {cartCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                                    style={{ fontSize: "0.7rem" }}
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Profile */}
                            <Link to="/profile" className="text-dark">
                                <i className="bi bi-person-circle fs-4"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    )
}