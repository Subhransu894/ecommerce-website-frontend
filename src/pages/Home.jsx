import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useContext } from "react";
import ShopContext from "../context/ShopContext";

export default function Home() {
    const category = [
        { name: "women", img: "https://picsum.photos/300/200?random=1" },
        { name: "men", img: "https://picsum.photos/300/200?random=2" },
        { name: "children", img: "https://picsum.photos/300/200?random=3" },
        { name: "accessories", img: "https://picsum.photos/300/200?random=4" },
    ];


    const collections = [
        {
            id: 1,
            title: "Winter Collection",
            desc: "Crafted from premium leather with sleek design.",
            img: "https://picsum.photos/300/200?random=6",
        },
        {
            id: 2,
            title: "Summer Collection",
            desc: "Lightweight and breathable for warm days.",
            img: "https://picsum.photos/300/200?random=7",
        },
    ];

    const { data: prod, loading, error } = useFetch(
        "https://ecommerce-website-backend-umber.vercel.app/api/products"
    );

    //Get search text from context
    const { searchItem } = useContext(ShopContext);

    const productList = Array.isArray(prod?.datas) ? prod.datas : [];

    //Filter products based on search text
    const filteredProducts =
        productList.filter((p) =>
        p.name.toLowerCase().includes(searchItem.toLowerCase())
        ) || [];

    const filteredCategories=category.filter((c)=>c.name.toLowerCase().includes(searchItem.toLowerCase()));
    
    const filteredCollections = collections.filter((c)=>c.title.toLowerCase().includes(searchItem.toLowerCase()));

    if (!searchItem && loading)
        return <p className="text-center mt-3">Loading...</p>;

    
    if (!searchItem && error)
        return <p className="text-center mt-3">Error: {error}</p>;

    return (
        <div className="container mt-3">

        {/* SHOW SEARCH RESULTS */}

        {searchItem ? (
            <>
            <h4 className="mt-3">Search Results</h4>

            {/* --------- CATEGORIES ---------- */}
            {filteredCategories.length > 0 && (
                <>
                <h5 className="mt-3">Categories</h5>
                <div className="row g-3">
                    {filteredCategories.map((c) => (
                    <div key={c.name} className="col-6 col-md-3">
                        <Link
                        to={`/products/${c.name}`}
                        className="text-decoration-none"
                        >
                        <div className="border rounded p-2 text-center">
                            <img src={c.img} className="img-fluid" />
                            <p className="mt-2">{c.name}</p>
                        </div>
                        </Link>
                    </div>
                    ))}
                </div>
                </>
            )}

            {/* --------- PRODUCTS ---------- */}
            {filteredProducts.length > 0 && (
                <>
                <h5 className="mt-4">Products</h5>
                <div className="row g-3">
                    {filteredProducts.map((p) => (
                    <div key={p._id} className="col-6 col-md-3">
                        <Link
                        to={`/products/details/${p._id}`}
                        className="text-decoration-none text-dark"
                        >
                        <div className="border rounded p-2 h-100">
                            <img
                            src={p.image}
                            className="img-fluid"
                            style={{ height: "180px", objectFit: "cover" }}
                            />
                            <p className="mt-2">{p.name}</p>
                            <p>₹{p.price}</p>
                        </div>
                        </Link>
                    </div>
                    ))}
                </div>
                </>
            )}

            {/* --------- COLLECTIONS ---------- */}
            {filteredCollections.length > 0 && (
                <>
                <h5 className="mt-4">Collections</h5>
                <div className="row g-3">
                    {filteredCollections.map((c) => (
                    <div key={c.id} className="col-12 col-md-6">
                        <div className="d-flex align-items-center border p-3 bg-white h-100">
                        <img
                            src={c.img}
                            className="img-fluid"
                            style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            }}
                        />
                        <div className="ms-3">
                            <h5>{c.title}</h5>
                            <p>{c.desc}</p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </>
            )}

            {/* --------- NO RESULTS ---------- */}
            {filteredCategories.length === 0 &&
                filteredProducts.length === 0 &&
                filteredCollections.length === 0 && (
                <p className="text-center mt-4">No results found!</p>
                )}
            </>
        ) : (
            <>
            {/* ORIGINAL HOME CONTENT  */}

            {/* CATEGORY SECTION */}
            <section className="container mt-4">
                <div className="row g-3 justify-content-center">
                {category.map((cat) => (
                    <div key={cat.name} className="col-6 col-md-3">
                    <Link
                        to={`/products/${cat.name.toLowerCase()}`}
                        className="text-decoration-none"
                    >
                        <div className="position-relative">
                        <img
                            src={cat.img}
                            className="img-fluid"
                            alt={cat.name}
                        />
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

            {/* BANNER */}
            <section className="container mt-4">
                <div className="row justify-content-center">
                <div className="col-12">
                    <img
                    src="https://picsum.photos/1240/400?random=5"
                    alt="img5"
                    className="img-fluid"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                    }}
                    />
                </div>
                </div>
            </section>

            {/* COLLECTION CARDS */}
            <section className="container mt-4 mb-5">
                <div className="row g-4 justify-content-center">
                    {collections.map((col) => (
                        <div key={col.id} className="col-12 col-md-6">
                            <div
                                className="d-flex align-items-center border p-3 bg-white h-100"
                                style={{ gap: "20px" }}
                            >
                                <img
                                src={col.img}
                                className="img-fluid"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    objectFit: "cover",
                                }}
                                />
                                <div>
                                <span className="d-block mb-2">New arrival</span>
                                <h5>{col.title}</h5>
                                <p style={{ fontSize: "0.8rem" }}>{col.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            </>
        )}
        </div>
    );
}
