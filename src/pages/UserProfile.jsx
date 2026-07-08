import { Link } from "react-router-dom"
export default function UserProfile(){
    const user={
        name:"John Doe",
        email:"john@hmail.com",
        phone:"9876543210",
    }
    return(
        <>
            <div className="container mt-4" style={{maxWidth:"600px"}}>
                <h2 className="text-center mb-4">User Profile</h2>
                <div style={{
                        border:"1px solid #ddd",
                        borderRadius:"8px",
                        padding:"20px",
                        marginBottom:"20px",
                        background:"#fff",
                        width:"100%"
                    }}
                >
                    <h4 style={{marginBottom:"10px"}}>Personal Details</h4>
                    <p><strong>Name: </strong>{user.name}</p>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Phone: </strong>{user.phone}</p>
                </div>
                <div className="d-flex flex-column flex-sm-row gap-3">
                    <Link to="/address" className="btn btn-primary" style={{padding:"10px"}}>Manage Address</Link>
                    <Link to="/orders" className="btn btn-secondary" style={{padding:"10px"}}>Order History</Link>
                </div>
            </div>
        </>
    )
}