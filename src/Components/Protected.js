

import React,{useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import AuthContext from "../Context/Auth";
import { userData } from "../FetchData";

const Protected = ({children}) =>{
  const navigate = useNavigate();
  const {setStatus,status,setUser} = useContext(AuthContext);

  useEffect(()=>{
    checkUser();
  },[children]);

  const checkUser=async()=>{
    
    let dataCookie = JSON.parse(secureLocalStorage.getItem("login"));
    
    if(dataCookie)
    {
      setStatus(true);
      const response =await userData();
      const userDetails = (response.data).filter(item=>item.Email===dataCookie.email && item.Password === dataCookie.password);
      const user_Data= userDetails[0];
      
      setUser( prev=> {
        return {...prev,user_Data}
      });
      
      return;
    }

    try{
      if(!status){
        navigate('/')
      }
    }catch(error){
      navigate('/')
    }
  }

  return status?<React.Fragment>{children} </React.Fragment>:<React.Fragment></React.Fragment>
}
export default Protected;


