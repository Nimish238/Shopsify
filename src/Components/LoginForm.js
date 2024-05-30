import React, { useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import AuthContext from '../Context/Auth';
import { userData } from '../FetchData';

export default function LoginForm() {

    const [loginDetails,setLoginDetails] = useState({
        email:"nimish@gmail.com",
        password:"123"
    })  ; 
    const navigate = useNavigate();
     const {setStatus} = useContext(AuthContext);
    



    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await userData();
        const validCredentials = (response.data).some(checkCredentials);

        if(validCredentials){
            secureLocalStorage.setItem('login',JSON.stringify(loginDetails));
             setStatus(true);                    
            navigate('/Home');
        }
        else{
            alert('Invalid username or password');   
            setStatus(false);         
        }
        
    }

    function checkCredentials(item){
        if(item.Email===loginDetails.email && item.Password === loginDetails.password){
            return true;
        }
    }

    const handleEmailChange = (e) =>{
        setLoginDetails(prev=>{
            return({...prev,email:e.target.value})
        })
        
    }

    const handlePasswordChange=(e)=>{

        setLoginDetails(prev=>{
            return({...prev,password:e.target.value})
        })
        
    }


  return (
    <div className="login-box">
        <figure>
        <img 
        src="shopsify.png" 
        alt="shopsify"
        />
        </figure>

    <div className="container d-flex justify-content-center align-items-center vh-100" >
   

        <form onSubmit={handleSubmit} className="border border-dark p-4 rounded shadow" style={{ width: '400px',height:'300px' ,backgroundColor:'#FAFAFA'}}>
        <div className="mb-3" >
            <label htmlFor="exampleInputEmail1" style={{color:'#000'}}>Email address:</label>
            <input 
            type="email" 
            className="form-control  border-0 border-bottom border-dark" 
            id="exampleInputEmail1"  
            placeholder="Enter email"  
            value={loginDetails.email}
            onChange={handleEmailChange} 
            autoComplete="current-email"  
            style={{ width: '100%' }} 
            required/>
           
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" style={{color:'#000'}}>Password:</label>
            <input 
            type="password" 
            className="form-control  border-0 border-bottom border-dark" 
            id="exampleInputPassword1" 
            placeholder="Password"  
            onChange={handlePasswordChange}
            value={loginDetails.password}
            autoComplete="current-password"  
            style={{ width: '100%' }} 
            required/>
        </div>
        
        <div className="mb-3 ">
        <button type="submit" className="btn btn-primary shadow" >Login</button>
        </div>
        
        
        
        </form>
    </div>
    </div>

  )
}


