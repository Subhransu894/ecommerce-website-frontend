import {Link} from "react-router-dom"
// import { useLocalFetch } from "../hooks/useLocalFetch"
import { useFetch } from "../hooks/useFetch"
export default function Home(){
    const category=[
        {name:"women",img:"https://picsum.photos/300/200?random=1"},
        {name:"men",img:"https://picsum.photos/300/200?random=2"},
        {name:"children",img:"https://picsum.photos/300/200?random=3"},
        {name:"accessories",img:"https://picsum.photos/300/200?random=4"}
    ]
    const{data:prod,loading,error}=useFetch("https://ecommerce-website-backend-umber.vercel.app/api/products")

    if(loading) return ( <p className="text-center mt-3">Loading...</p> )
    if(error) return ( <p className="text-center mt-3">Error: {error}</p> )
    return(
        <>
            <div className='container mt-3'> 
                <section className="container mt-4">
                    <div className="row g-3 justify-content-center">
                        {category.map((cat)=>(
                            <div key={cat.name} className="col-6 col-md-3">
                                 <Link
                                    to={`/products/${cat.name.toLowerCase()}`}
                                    className="text-decoration-none"
                                >
                                    <div className="position-relative">
                                        <img src={cat.img} className="img-fluid" alt={cat.name} />
                                        <span
                                            className="position-absolute px-2 py-1 text-white rounded"
                                            style={{
                                            backgroundColor: "rgba(151,145,145,0.6)",
                                            fontSize: "0.9rem",
                                            top: "10px",
                                            left: "10px",
                                            }}
                                        >
                                            {cat.name}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            
                <section className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-12">
                        <img
                            src="https://picsum.photos/1240/400?random=5"
                            alt="img5"
                            className="img-fluid "
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                        </div>
                    </div>
                </section>


                <section className="container mt-4 mb-5">
                    <div className="row g-4 justify-content-center">
                        {/* Card 1 */}
                        <div className="col-12 col-md-6">
                        <div
                            className="d-flex align-items-center border p-3 bg-white h-100"
                            style={{ gap: "20px" }}
                        >
                            <div>
                            <img
                                src="https://picsum.photos/300/200?random=6"
                                alt="img6"
                                className="img-fluid "
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                            </div>
                            <div className="text-center text-md-start">
                            <span className="d-block mb-3" style={{ fontSize: "0.8rem", marginBottom: "10px" }}>
                                New arrival
                            </span>
                            <h5 className="mb-2">Winter Collection</h5>
                            <p style={{ fontSize: "0.8rem"}}>
                                Crafted from premium leather with a sleek design. Perfect blend of functionality and elegance.
                            </p>
                            </div>
                        </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col-12 col-md-6">
                        <div
                            className="d-flex align-items-center border p-3 bg-white h-100"
                            style={{ gap: "20px" }}
                        >
                            <div>
                            <img
                                src="https://picsum.photos/300/200?random=7"
                                alt="img7"
                                className="img-fluid "
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                            </div>
                            <div className="text-center text-md-start">
                            <span  className="d-block mb-3" style={{ fontSize: "0.8rem", marginBottom: "10px" }}>
                                New arrival
                            </span>
                            <h5  className="mb-2">Summer Collection</h5>
                            <p style={{ fontSize: "0.8rem" }}>
                                Lightweight and breathable — designed to keep you cool during warm days.
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}