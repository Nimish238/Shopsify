import { useState,createContext } from "react";

const AuthContext = createContext();

export const Auth=({children})=>{

    const [status,setStatus] = useState(false);
    const [user,setUser] = useState({});
    const [quant,setQuant] = useState(0);

    return(
        <AuthContext.Provider value={{status , setStatus , user , setUser , quant , setQuant}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;