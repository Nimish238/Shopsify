import React,{ useContext, useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import AuthContext from '../../Context/Auth';

function ProductModal(props) {
  
  const {  productid,productTitle, productDesc, productImg, closeModal } = props;
  const {quant} = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const addToCart=()=>{
    props.addProductToCart(productid);
  }

  const removeFromCart =()=>{
    props.deleteProduct( productid);
  }


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
      closeModal();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
});
 
  return ReactDOM.createPortal(
    <div className='modal-wrapper'>
      <div className='modal-container'>
        
        <img src='cross.png' alt='img' height="20px" width="20px"  onClick={()=>{closeModal()}} style={{float:'right',transition:'transform 0.3s ease-in-out',cursor:'pointer',transform:isHovered?'scale(1.2)':'scale(1)'}} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}/>
        <img src={productImg} alt="img" height="150px" width="150px" className="modal-img" />
        <h3>{productTitle} </h3>
        <p>{productDesc}</p>

       //  {
       //    (quant<1)&&<span className='btn-box' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
       //    <button className='btn btn-success' title='Increment' onClick={()=>addToCart()}>Add To Cart</button>    
       //  </span>  
       //  }

       // { 
       //  (quant!==0)&&<span className='btn-box' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
       //    <button className='btn btn-success' title='Increment' onClick={()=>addToCart()}>+</button>
       //    &nbsp; {quant} &nbsp;
       //    <button className='btn btn-danger' title='Decrement' onClick={()=>removeFromCart()}>-</button>
       //  </span>
       //  }
        

      </div>   
    </div>,
    document.querySelector('.productModalClass')
  );
}

export default ProductModal;
