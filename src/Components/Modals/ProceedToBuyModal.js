import React,{ useEffect,useState,useRef } from "react";
import ReactDOM from 'react-dom';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCheckoutItems } from "../Redux/Slices/UserSlice";

function ProceedToBuyModal(props){

    const [total,setTotal] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleCheckout =() =>{
        props.closeProceedToBuyModal();
        dispatch(addCheckoutItems({userEmail:props.userEmail,productData:props.data,totalAmount:total}))
        navigate('/Checkout');   
    }

    useEffect(()=>{
        const totalAmount = (props.data).reduce((accumulator,currentValue)=>accumulator + Number(currentValue.amount),0);
        setTotal(totalAmount);
    })
    
    useEffect(()=>{
        document.body.style.overflowY='hidden';
        return()=>{
          document.body.style.overflowY='scroll';
        }
    })

    useEffect(() => {
        const handleClickOutside = (event) => {
          const modalContainer = document.querySelector('.modal-container');
          if (modalContainer && !modalContainer.contains(event.target)) {
            props.closeProceedToBuyModal();
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
      
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    const closeRef = useRef();
    return ReactDOM.createPortal (
         <div className='modal-wrapper' ref={closeRef}>
            <div className='modal-container'>


            <img src='cross.png' alt='img' height="10px" width="10px"  onClick={()=>{props.closeProceedToBuyModal()}} style={{float:'right',transition:'transform 0.3s ease-in-out',cursor:'pointer',transform:isHovered?'scale(1.2)':'scale(1)' ,}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/><br/>

                {
                    (props.data).map(item=>{
                        return(
                            <div key={item.uniqueID}>                             
                                <p key={item.id}><img src={item.image} height="20px" width="20px"/> <span> {item.name}
                                 = {item.quantity} * {item.price} = <b>{item.amount}</b></span></p>
                            </div>
                        )
                    })
                }
                <hr/>

            <b><p> Subtotal :- {"₹"+total.toFixed(2)}</p></b>
            <br/>

            <button className="btn btn-success m-3" onClick={handleCheckout}>Proceed to Pay</button>

            </div>
        </div>,
        document.querySelector('.proceedToBuyModalClass')
        
    );
}
export default ProceedToBuyModal;