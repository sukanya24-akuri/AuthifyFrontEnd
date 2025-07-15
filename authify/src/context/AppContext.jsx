import { createContext, useEffect, useState } from "react"
import { AppConstants } from "../Util/Constants";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext= createContext();

export const AppContextProvider=(props)=>
{
    axios.defaults.withCredentials=true;
const backEnd=AppConstants.BACKEND_URL;
const [isLoggedIn,setIsLoggedIn]=useState(false);
const [userData,setUserData]=useState(false);
const getUserData= async()=>{
    const response=await axios.get(backEnd+"/profile");
    if(response.status===200)
    {
       setUserData(response.data);
       console.log("User Data:", response.data);      
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
    const getAuthState=async()=>{
        try
        {
        const response=await axios.get(backEnd+"/isAuthify");
        
        if(response.status===200 && response.data===true) 
        {
    
            setIsLoggedIn(true);
            await getUserData();
        }
        else{
            setIsLoggedIn(false);
        }
    }
    catch (error) {
      console.error("Error fetching authentication state:", error);
      setIsLoggedIn(false);
    }
}
    useEffect(() => {
    getAuthState();
  }, []);
    
    return(
        <AppContext.Provider value={contextValue}>
        {props.children}
        </AppContext.Provider>
    )
}