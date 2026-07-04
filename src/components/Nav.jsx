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
            <nav className='navbar  navbar-expand-md bg-light px-3 justify-content-between justify-content-md-center'>
                <div className='container d-flex align-items-center justify-content-between gap-4' 
                    style={{ rowGap: "12px" }} 
                >
                    <div className='d-flex align-items-center gap-4'>
                        <Link to="/" style={{textDecoration:"none", color:"gray"}}>
                            <h6 style={{ margin: 0, fontWeight: 600 }}>MyShopingApp</h6>
                        </Link>
                    </div>

                        <form className='position-relative' style={{
                                flexGrow: 1,
                                maxWidth: "300px",
                                minWidth: "160px",   // keeps input usable on phones
                            }}
                        >
                            <i className='bi bi-search text-secondary position-absolute top-50 start-0 translate-middle-y ms-2'></i>
                            <input type="search" placeholder='Search' className="form-control ps-5"
                            style={{ width: "220px",maxWidth: "100%",borderRadius:"20px" }} value={searchItem} onChange={(e)=>setSearchItem(e.target.value)}/>
                        </form>

                    <div  className="d-flex align-items-center gap-3 me-3 flex-wrap">
                       {!user ? (
                            <>
                                <Link to="/login"  className="btn btn-secondary btn-sm px-3 py-1 text-decoration-none">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-outline-secondary btn-sm px-3 py-1 text-decoration-none">
                                    Register
                                </Link>
                            </>
                       ):(
                            <>
                                <span>Hello, {user.name}</span>
                                <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                       )}
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
                        <Link to="/cart" className='d-flex align-items-center text-decoration-none text-dark position-relative'>
                            <i className='bi bi-cart fs-5'></i>
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                                style={{ fontSize: "0.7rem" }}
                                >
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link to="/profile" style={{color:"#000",marginLeft:"15px"}}>
                            <i className="bi bi-person-circle fs-4" style={{fontSize:"1.7rem",cursor:"pointer"}}></i>
                        </Link>
                    </div>
                </div>
            </nav>
        </>

    )
}