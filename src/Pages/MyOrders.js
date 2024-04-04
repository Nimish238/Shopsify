import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import Navbar2 from "./Navbar_2";
import { removePlacedOrders } from "../Components/Redux/Slices/MasterSlice";


export default function MyOrders (){

    const [records,setRecords] = useState([]);
    const dispatch = useDispatch();

    const allOrders = useSelector((state)=>{
        return (state.masterData).placedOrders;
    })

    useEffect(()=>{
        setOrderTable();
    },[allOrders]);


    const setOrderTable = () =>{
        if(allOrders){           
            const orderedItems = allOrders.map(obj=>{               
                return obj.articles ;
            })
            setRecords(orderedItems.flat(1));            
        }
    }

    const emptyCart =() =>{
        dispatch(removePlacedOrders());
    }

    const columns = [
        {
            name:"Item",
            selector:row=><p className="p-2 m-0"> <img height="50px" width="50px" src={row.image} alt="img"/></p>
        },
        {
            name:"Name",
            selector:row=>(row.name)
        },
        {
            name:"Price",
            selector:row=>("₹"+row.price),
            sortable:true
        },
        {
            name:"Quantity",
            selector:row=>(row.quantity),
            sortable:true
        },
        {
            name:"Amount",
            selector:row=>"₹"+row.amount,
            sortable:true
        }
    ]

    return (
        <div>

            <Navbar2/>
            <br/><br/>


            <div className="table-wrapper">
            <DataTable
            columns={columns}
            data={records}
            fixedHeader
            pagination
            keyField="uniqueID"
            />
            </div>

            {
             (records.length)>0 && <div className="d-flex justify-content-center">
            <button onClick={emptyCart} className="btn btn-danger">Clear History</button>
            </div>}



        </div>
    )


}