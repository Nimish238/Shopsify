import { useState,createContext } from "react";

const AuthContext = createContext();

export const Auth=({children})=>{

    const [status,setStatus] = useState(false);
    const [user,setUser] = useState({});
    const [quant,setQuant] = useState(0);
    const [profileModal,setProfileModal] = useState(false);

    const openProfileModal =()=>{
        setProfileModal(true);
    }

    const closeProfileModal = () =>{
        setProfileModal(false);
    }

    return(
        <AuthContext.Provider value={{status , setStatus , user , setUser , quant , setQuant, profileModal, openProfileModal, closeProfileModal}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;