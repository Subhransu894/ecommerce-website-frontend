import { createContext, useContext, useState } from "react";

export const AddressContext = createContext();

export const AddressProvider=({children})=>{
    //load address from local storage
    const[address,setAddress]=useState(()=>{
        return JSON.parse(localStorage.getItem("addresses")) || [];
    })
    const[selectAddress,setSelectAddress]=useState(()=>{
        return JSON.parse(localStorage.getItem("selectedAddress")) || null;
    })

    //saved address list
    const savedAddress=(list)=>{
        localStorage.setItem("addresses",JSON.stringify(list))
    }
    //saved selected id
    const savedSelected=(id)=>{
        localStorage.setItem("selectedAddress",JSON.stringify(id))
    }

    const addAddress=(newAddress)=>{
        const newList=[...address,{id:Date.now(),...newAddress}]
        setAddress(newList);
        savedAddress(newList)
    }

    const deleteAddress=(id)=>{
        const newList=address.filter((addr)=> addr.id !== id)
        setAddress(newList)
        savedAddress(newList)
        if (selectAddress === id){
            setSelectAddress(null); // Reset selected if deleted
            savedSelected(null)
        } 
    }

    const updateAddress=(updateAdd)=>{
        const newList=address.map((add)=>add.id === updateAdd.id ? updateAdd : add)
        setAddress(newList)
        savedAddress(newList)
    }

    const chooseAddress=(id)=>{
        setSelectAddress(id);
        savedSelected(id)
    }

    return(
        <AddressContext.Provider value={{address,addAddress,deleteAddress,updateAddress,chooseAddress,selectAddress}}>
            {children}
        </AddressContext.Provider>
    )
}
export const useAddress = () => useContext(AddressContext);
export default AddressProvider; 
