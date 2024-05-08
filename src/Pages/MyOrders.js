import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import Navbar2 from "./Navbar_2";

import { removePlacedOrders } from "../Components/Redux/Slices/MasterSlice";
import AuthContext from "../Context/Auth";
import ProfileModal from "../Components/Modals/ProfileModal";

export default function MyOrders(props) {
  const [records, setRecords] = useState([]);
  const [searchList,setSearchList] = useState(records);
  const dispatch = useDispatch();
  const {profileModal} = useContext(AuthContext);

  const allOrders = useSelector((state) => {
    return state.masterData.placedOrders;
  });

  useEffect(() => {
    setOrderTable();
  }, [allOrders]);

  useEffect(()=>{
    setSearchList(records);
  },[records]);

  const setOrderTable = () => {
    if (allOrders) {
      const orderedItems = allOrders.map((obj) => {
        return obj.articles;
      });
      setRecords(orderedItems.flat(1));
    }
  };

  const emptyCart = () => {
    dispatch(removePlacedOrders());
  };

  const filterProductsOnSearch = (value) => {
    const searchItems = records.filter(item=>{
        return item.name.toLowerCase().includes(value.toLowerCase());
    })
    setSearchList(searchItems);
  };

  const columns = [
    {
      name: "Item",
      selector: (row) => (
        <p className="p-2 m-0">
          {" "}
          <img height="50px" width="50px" src={row.image} alt="img" />
        </p>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Price",
      selector: (row) => "₹" + row.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => "₹" + row.amount,
      sortable: true,
    },
  ];

  return (
    <div>
        {profileModal && <ProfileModal></ProfileModal>}
      <Navbar2 filterProductsOnSearch={filterProductsOnSearch} />
      <br />
      <br />

      <div className="table-wrapper">
        <DataTable
          columns={columns}
          data={searchList}
          fixedHeader
          pagination
          keyField="uniqueID"
        />
      </div>

      {records.length > 0 && (
        <div className="d-flex justify-content-center">
          <button onClick={emptyCart} className="btn btn-danger">
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}
