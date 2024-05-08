import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../Context/Auth";
import ReactDOM from "react-dom";

function ProfileModal(){

    const {user,closeProfileModal} = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    const userRef = useRef();

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
        //   const modalContainer = document.querySelector('.modal-container');
        //   if (modalContainer && !modalContainer.contains(event.target)) {
        //     closeProfileModal();
        //   }

          if(userRef.current && !userRef.current.contains(event.target)){
                closeProfileModal();
          }

        };
      
        document.addEventListener('mousedown', handleClickOutside);
      
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    useEffect(()=>{
        document.body.style.overflowY='hidden';
        return()=>{
          document.body.style.overflowY='scroll';
        }
    })

       
    return ReactDOM.createPortal(

        <div className="modal-wrapper">
            <div className="modal-container" ref={userRef}>

                <img src='cross.png' alt='img' height="15px" width="15px"  
                onClick={()=>{closeProfileModal()}} 
                style={{float:'right',transition:'transform 0.3s ease-in-out',cursor:'pointer',transform:isHovered?'scale(1.2)':'scale(1)'}} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}/>

                <img src="profile.png" alt="img" height="150px" width="150px" className="modal-img" />
                <p><b>Name :</b>{user?.user_Data?.Name}</p>
                <p><b>Email :</b> {user?.user_Data?.Email}</p>
                <p><b>Gender :</b> {user?.user_Data?.Gender}</p>
                <p><b>Pincode :</b> {user?.user_Data?.Pincode}</p>

            </div>
        </div>,
        document.querySelector('.profileModalClass')
    );
}
export default ProfileModal;