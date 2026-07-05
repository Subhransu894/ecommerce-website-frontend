import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = ({children}) =>{
    const {user} = useAuth()
    if(!user){
        return <Navigate to='/login' replace></Navigate>
    }
    return children
}
export default ProtectedRoutes