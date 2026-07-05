import {useFetch} from "../hooks/useFetch"
export default function OrderHistory(){
    const token = localStorage.getItem("token")
    const {data:orders,loading,error}=useFetch("https://ecommerce-website-backend-umber.vercel.app/api/orders",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(loading)return ( <p className="text-center mt-3">Loading...</p> )
    if(error) return ( <p className="text-center mt-3">Error: {error}</p> )
    if(!orders || orders.length === 0) return ( <p className="text-center mt-3">No products yet...</p> )
    return(
        <>
            <div style={{ padding: "20px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Order history</h2>
                {orders.map((order)=>(
                    <div key={order._id} 
                        style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "15px", marginBottom: "15px" }}
                    >
                        <p><strong>Order ID:</strong> <span style={{ color: "#555" }}>{order._id}</span></p>
                        <strong>Status:</strong>{" "}
                        <span style={{ color: order.status === "Placed" ? "green" : "orange", fontWeight: "600" }}>
                        {order.status}
                        </span>
                        <p><strong>Total Amount:</strong> <span style={{ color: "#333" }}>₹{order.totalAmount}</span></p>
                        <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>

                        <h4 style={{ marginTop: "15px", marginBottom: "10px", color: "#3a86ff" }}>Items:</h4>
                        <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
                            {order.items.map((item)=>(
                                <li key={item._id} style={{ marginBottom: "5px" }}>
                                    Product Id: {item.productId} , qty:{item.qty}, price: {item.price}
                                </li>
                            ))}
                        </ul>

                        <h4 style={{ marginTop: "15px", marginBottom: "10px", color: "#3a86ff" }}>Delivery Address:</h4>
                        <p style={{ margin: "0", color: "#555" }}>
                            <strong>Place:</strong> {order.address.fullAddress} | <strong>Pincode:</strong> {order.address.pincode}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}