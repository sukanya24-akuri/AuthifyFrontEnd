import { createContext, useState } from "react"
import { AppConstants } from "../Util/Constants";

export const AppContext= createContext();

export const AppContextProvider=(props)=>
{
const backEnd=AppConstants.BACKEND_URL;
const [isLoggedIn,setIsLoggedIn]=useState(false);
const [userData,setUserData]=useState(false);
    const contextValue={
        backEnd,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData
    }
    return(
        <AppContext.Provider value={contextValue}>
        {props.children}
        </AppContext.Provider>
    )
}