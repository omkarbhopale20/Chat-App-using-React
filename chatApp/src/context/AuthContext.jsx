import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth,(user) =>{
            setCurrentUser(user);
            // console.log(user);
        });

        // cleanup function to avoide memory leaking
        return () =>{
            unsub();
        }
    }, []);


    // Any components can reach current user

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
    
};