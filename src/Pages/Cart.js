import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/Auth";
import DataTable from "react-data-table-component";
import {  useDispatch, useSelector } from "react-redux";
import {updateProductQuantity,removeProduct } from "../Components/Redux/Slices/UserSlice";
import {clearAllUsers} from "../Components/Redux/Action";
import { MdDelete } from "react-icons/md";
import ProceedToBuyModal from "../Components/Modals/ProceedToBuyModal";
import Navbar2 from "./Navbar_2";


export default function Cart (props){

    const {user} = useContext(AuthContext);
    const dispatch = useDispatch();
    const [data,setData] = useState([]);
    const [records,setRecords] = useState(data);
    const userEmail = user?.user_Data?.Email;
    const [modal,setModal] = useState(false);


    const selectedProducts = useSelector((state)=>{
        return (state.userItems).cartArray;
    })


    useEffect (()=>{
        setRecords(data);
    },[data])


    useEffect(()=>{
        fetchAllProducts();
    },[selectedProducts,userEmail])
    
    const columns=[
        {
            name:"Item",
            selector:row=> <p className="p-2 m-0"> <img height="50px" width="50px" src={row.image} alt="img"/></p>
        },
        {
            name:"Name",
            selector:row=>row.name
        },
        {
            name:"Price",
            selector:row=>("₹"+row.price),
            sortable:true
        },
        {
            name:"Quantity",
            selector: row=><span>
            <button className='btn btn-success' title='Increment' onClick={()=>addToCart(row.id)}>+</button> 
            &nbsp;{row.quantity} &nbsp;
            <button className='btn btn-danger' title='Decrement' onClick={() =>deleteProduct(row.id)}>-</button>
            </span>,
            sortable:true
        },
        {
            name:"Amount",
            selector: row=>"₹"+row.amount,
            sortable:true
        },
        {
            name:"Delete",
            selector: row=> <button className="btn btn-danger" onClick={()=>removeProductFromCart(row.id)}><MdDelete style={{fontSize:"25px"}}/></button>
        }
        
    ]


    const MainModal =() =>{
        return(
        <ProceedToBuyModal  
            data={data}
            closeProceedToBuyModal ={closeProceedToBuyModal}
            userEmail={userEmail}
        />
    )}

    const addToCart=(id)=>{
        let quantity = Number(selectedProducts.filter(item =>item.product.id===id).map(item=>item.quantity));    
        quantity = (quantity === 0 || quantity === null)? Number(1) : quantity+1; 
          dispatch(updateProductQuantity({quantity,id,userEmail}));
         
      }


    const removeProductFromCart = (id)=>{
        let index = selectedProducts.findIndex(obj=> obj.user===userEmail && obj.product.id===id);
        console.log(index)
        dispatch(removeProduct(index));
    }
    
    const deleteProduct=(id)=>{
        
        let quantity = Number(selectedProducts.filter(item=>item.user === userEmail && item.product.id===id).map(item=>item.quantity));
        quantity=quantity > 1 ? Number(quantity-1) : 0;
        if(quantity===0){   
          removeProductFromCart(id);
        }
        else{
            
          dispatch(updateProductQuantity({quantity,id,userEmail}));
        }
    }

    const emptyCart =() =>{  
        dispatch(clearAllUsers(userEmail));
    }

    const openProceedToBuyModal =()=>{
        setModal(true);
    }

    const closeProceedToBuyModal=()=>{
        setModal(false);
    }

    const fetchAllProducts = () =>{
        
        const cartProducts= selectedProducts.filter(item=>item.user===userEmail);
        const productData = cartProducts.map(mapProductsToData);
        function mapProductsToData(item){
            let obj={
                uniqueID:crypto.randomUUID(),
                id:item.product.id,
                name:item.product.title,
                image:item.product.image,
                quantity:item.quantity,
                price:item.product.price,
                category:item.product.category,
                amount:((item.quantity)*(item.product.price)).toFixed(2)
            }
            
            return obj;
            
        }
        setData(productData);           
    }


    return(
        <div>

            {modal && MainModal()}
            
            
            <Navbar2 />

            <div className="table-wrapper">
            <DataTable
            columns={columns}
            data={records}
            fixedHeader
            pagination
            />

            </div>

            {data && data.length!==0 && (<div  className="d-flex justify-content-center mt-3">
                <button className="btn btn-danger" onClick={emptyCart}>Clear cart</button> &nbsp; &nbsp;
                <button className="btn btn-dark" onClick={openProceedToBuyModal}> Place Order</button>
            </div>)}

         

        </div>
    )
}


