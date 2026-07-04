import { useState } from "react"
import {loginUser} from "../service/authService"
import { useNavigate,Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Login = ()=>{
    const navigate = useNavigate()
    const {login} = useAuth()
    const [showPassword,setShowPassword] = useState(false)
    const [formData,setFormData] = useState({
        email:"",password:""
    })
    const handleChange = (e)=>{
        const {name,value}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value,
        }))
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const res = await loginUser(formData)
            console.log(res.data)

            login(res.data.token,res.data.user)
            navigate("/")
        } catch (error) {
            console.log(error.response?.data)
        }
    }
    return(
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight:"80vh"}}>
            <div className="card shadow p-4 border-0" style={{width:"400px"}}>
                <h2 className="text-center mb-4 fw-bold">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange}/>
                    </div>
                    <div className="mb-3 position-relative">
                        <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Enter password" name="password" value={formData.password} onChange={handleChange}/>
                         <i
                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                            style={{right:"15px", top:"50%",transform:"translateY(-50%)",cursor:"pointer"}}
                            onClick={()=>setShowPassword(!showPassword)}
                        ></i>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2">Login</button>
                    <p className="text-center mt-3 mb-0 text-secondary">
                        New user ? {" "} <Link to='/register' className="ms-1 text-decoration-none">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default Login