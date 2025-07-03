import { createContext, useState } from "react"
import { AppConstants } from "../Util/Constants";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext= createContext();

export const AppContextProvider=(props)=>
{
const backEnd=AppConstants.BACKEND_URL;
const [isLoggedIn,setIsLoggedIn]=useState(false);
const [userData,setUserData]=useState(false);
const getUserData= async()=>{
    const response=await axios.get(`${backEnd}/profile`);
    if(response.status===200)
    {
       setUserData(response.data);
       
    }
    else{
        toast.error("unable to fetch the profile data");
    }
}
    const contextValue={
        backEnd,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
    }
    return(
        <AppContext.Provider value={contextValue}>
        {props.children}
        </AppContext.Provider>
    )
}