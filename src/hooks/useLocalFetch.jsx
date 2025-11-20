import { useState,useEffect } from "react";
import { products as localProduct } from "../pages/Products";
export function useLocalFetch(){
    const[data,setData]=useState(null)
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState(null)
    useEffect(()=>{
        const timer=setTimeout(()=>{
            try {
                setData(localProduct)
                setError(null)
            } catch (err) {
                setError("failed to fetch data")
                setData(null)
            }finally{
                setLoading(false)
            }
        },3000)
        return ()=>clearTimeout(timer);
    },[])
    return {data,loading,error};
}