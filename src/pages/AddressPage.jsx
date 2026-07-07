import { useAddress } from "../context/AddressContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function(){
    const { address, addAddress, deleteAddress, chooseAddress, selectAddress,updateAddress } = useAddress();
    const [showModal, setShowModal] = useState(false); // control popup
    const [form, setForm] = useState({ name:"", phone:"", addressPlace:"", emailid:"", pincode:"" });
    const [message, setMessage] = useState("");
    const [editAddress,setEditAddress]=useState(null);
    const navigate = useNavigate()

      const handleAddAddress = (e) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.addressPlace || !form.emailid || !form.pincode) {
            alert("Please fill all fields");
            return;
        }

        if(editAddress){
            // update existing
            // deleteAddress(editAddress.id);
            updateAddress({...form, id:editAddress.id})
            setMessage("Address updated successfully!");
        }else{
            //create new
            addAddress(form)
            setMessage("Address added successfully!");
        }
        setEditAddress(null)
        setShowModal(false)
        setForm({name:"",phone:"",addressPlace:"",emailid:"",pincode:""})

        setTimeout(() => setMessage(""), 3000); // remove message after 3 sec
    };

    return(
        <>
        <div className="container d-flex flex-column align-items-center mt-4">
            <h2 className="text-center mt-2">Manage Address</h2>
            {message && <p style={{ color:"green" , textAlign:"center" ,marginTop:"10px", fontWeight:"600"}}>{message}</p>}
             <button 
                onClick={() =>{ 
                    setEditAddress(null)
                    setShowModal(true)
                    setForm({name:"",phone:"",addressPlace:"",emailid:"",pincode:""})
                    }}
                style={{ marginBottom:"20px", padding:"10px 15px", background:"#3a86ff", color:"#fff", border:"none", borderRadius:"4px", cursor:"pointer" }}
            >
                Add New Address
            </button>

            {/* addresslist */}
            <div style={{width:"100%",maxWidth:"400px"}}>
                {address.length === 0 && <p style={{textAlign:"center",fontWeight:"600",marginTop:"10px"}}>No addresses found. Add new address.</p>}
                {address.map((add)=>(
                    <div  key={add.id} style={{
                            border:"1px solid #ccc", borderRadius:"8px", padding:"15px", marginBottom:"15px",
                            background: selectAddress === add.id ? "#f0f8ff":"#fff"
                        }} 
                    >
                        {[
                        ["Name", add.name],
                        ["Mobile", add.phone],
                        ["Address", add.addressPlace],
                        ["Email", add.emailid],
                        ["Pincode", add.pincode]
                        ].map(([label, value]) => (
                        <div key={label} style={{ display:"flex",flexWrap:"wrap" }}>
                            <span style={{ width:"100px", fontWeight:"600" }}>{label}:</span>
                            <span style={{ flex:1 }}>{value}</span>
                        </div>
                        ))}
                        <div style={{ display:"flex", gap:"10px", marginTop:"10px",flexWrap:"wrap" }}>
                            <button onClick={() => {
                                    chooseAddress(add.id); 
                                    navigate("/cart")
                                }}
                                    style={{ flex:1, padding:"8px", background: selectAddress===add.id ? "#3a86ff":"#fff", 
                                    color: selectAddress===add.id ? "#fff":"#3a86ff", border:"1px solid #3a86ff", 
                                    borderRadius:"4px", cursor:"pointer" 
                                    }}
                            >
                                {selectAddress===add.id ? "Selected":"Select"}
                            </button>
                            <button onClick={()=>{
                                    setEditAddress(add) // store the address you want to edit
                                    setForm(add) //  pre-fill the form
                                    setShowModal(true)
                                }}
                            >
                                {editAddress ? "Updated" : "Edit"}
                            </button>
                            <button onClick={() => deleteAddress(add.id)}
                                    style={{ flex:1, padding:"8px", background:"#ff4d4f", color:"#fff", 
                                    border:"none", borderRadius:"4px", cursor:"pointer" 
                                    }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/*  Modal  */}
            {showModal && ( 
                <div style={{
                    position:"fixed", top:0, left:0, width:"100%", height:"100%", background:"rgba(0,0,0,0.5)",
                    display:"flex", justifyContent:"center", alignItems:"center"
                    }}
                >
                    <div style={{ background:"#fff", padding:"20px", borderRadius:"8px", width:"90%",maxWidth:"400px" }}>
                        <h2>Add New Address</h2>
                        <form onSubmit={handleAddAddress} style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                            <input type="text" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/>
                            <input type="tel" maxLength={10} pattern="[0-9]{10}" placeholder="Mobile" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value.replace(/\D/g,"")})}
                             required title="Enter a valid 10-digit mobile number"/>
                            <input type="text" placeholder="Address" value={form.addressPlace} onChange={(e)=>setForm({...form,addressPlace:e.target.value})} required/>
                            <input type="email" placeholder="Email" value={form.emailid} onChange={(e)=>setForm({...form,emailid:e.target.value})} required/>
                            <input type="text" maxLength={6} pattern="[0-9]{6}" placeholder="Pincode" value={form.pincode} onChange={(e)=>setForm({...form,pincode:e.target.value.replace(/\D/g,"")})} 
                            required title="Enter a valid 6-digit pincode"/>

                            <div style={{ display:"flex", gap:"10px", marginTop:"10px",flexWrap:"wrap" }}>
                                <button type="submit" 
                                    style={{ flex:1, padding:"8px", background:"#3a86ff", 
                                    color:"#fff", border:"none", borderRadius:"4px", 
                                    cursor:"pointer" 
                                    }}
                                >
                                    Add
                                </button>
                                <button type="button" onClick={()=>setShowModal(false)} 
                                    style={{ flex:1, padding:"8px", background:"#555", color:"#fff", 
                                    border:"none", borderRadius:"4px", cursor:"pointer" 
                                    }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>  
            )}
        </div>
        </>
    )
}   

