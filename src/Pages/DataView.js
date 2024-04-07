import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function DataView(props) {


  const addToCart=(id)=>{
    props.addProductToCart(id);
  }

  const removeFromCart =(id)=>{
    props.deleteProduct(id);
  }

  
  const openModal = (id,title,desc,image,quantity) =>{
    props.openModalDetails(id,title,desc,image,quantity);
  }

  const customizedDescription = () =>{
    return(
      <React.Fragment>
       {props.desc.slice(0,100)}
       <Link href='#' onClick={()=>openModal(props.id,props.title,props.desc,props.image)}> ...read more</Link>
      </React.Fragment>
    )
  }



  return (
    <div className="container my-3 ">
        <div className="card shadow" style={{width: '18rem'}}>
        <img className="card-img-top " src={props.image} alt={props.altText} height="250px" width="150px"/>
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text" >{props.desc && props.desc.length >100 ? customizedDescription() : props.desc}</p>
            <p className='card-text'>{"₹"+props.price}</p>

            {
            (props.quantity<1)&&<span className='btn-box'>
              <button className='btn btn-success' title='Increment' onClick={()=>addToCart(props.id)}>Add To Cart</button>    
            </span>  
            }         

            {
            (props.quantity>=1) && <span className='btn-box'>
              <button className='btn btn-success' title='Increment' onClick={()=>addToCart(props.id)}>+</button> 
              &nbsp;{props.quantity} &nbsp;
              <button className='btn btn-danger' title='Decrement' onClick={() =>removeFromCart(props.id)}>-</button>
            </span>
            }

            <br/><br/>


            <button type="button" className="btn btn-dark" onClick={()=>openModal(props.id,props.title,props.desc,props.image,props.quantity)}>View Product</button>

        </div>
        </div>
    </div>
  )
}


DataView.propTypes = {
  title : PropTypes.string,
  desc : PropTypes.string
}
