import { useState,useEffect } from "react";
export function useFetch(url){
    const[data,setData]=useState(null)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(null)
    
    async function fetchData() {
        try {
            setLoading(true)

            const res = fetch(url);
            if(!res.ok){
                throw new Error ("Failed to fetch data");
            }
            const jsonData = await res.json()
            setData(jsonData);
            setError(null)
        } catch (err) {   
            setError(err.message || "something went wrong")
            setData(null)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(url){
            fetchData();
        }
    },[url])
    return {data,loading,error};
}