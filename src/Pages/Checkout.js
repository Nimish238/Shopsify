import React, { useContext,useEffect,useState } from "react";
import Navbar2 from "./Navbar_2";
import { useForm } from "react-hook-form";
import AuthContext from "../Context/Auth";
import IndianStates from "../States.json";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUsers, setPlacedOrders } from "../Components/Redux/Action";
import { removeCheckoutItems } from "../Components/Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {


  const form = useForm();
  const { register,setValue,handleSubmit } = form;
  const { user } = useContext(AuthContext);
  const [preceedOnline,setProceedOnline] = useState(true);
  const [userDetails,setUserDetails] = useState({});
  const navigate =useNavigate();
  const dispatch = useDispatch();

  const cartCheckoutItems =useSelector((state)=>{
    return (state.userItems).checkoutItems;
  })

  useEffect(()=>{
    if(user?.Email===cartCheckoutItems?.userEmail){
      setUserDetails(user?.user_Data);
    }
    setValue("name",userDetails?.Name)
  },[cartCheckoutItems,user,userDetails])

   
 const onPaymentMethodChange=(e)=>{
  
  let value = e.target.value;
  if(value=== 'online'){
    setProceedOnline(true);
  }
  else{
    setProceedOnline(false)
  }
 }

 const placeOrder =(data) =>{
  if(preceedOnline===true){
    alert('Server down for online payment');
     console.log(cartCheckoutItems[0].productData)
  }
  else{
    let placedItemObj ={
      customerInfo : data,
      articles : cartCheckoutItems[0].productData,
      timeOfPurchase : new Date().toISOString()
    }
    dispatch(setPlacedOrders(placedItemObj));
    dispatch(removeCheckoutItems());
    dispatch(clearAllUsers(user?.user_Data?.Email));
    alert('Congratulations, Your order placed successfully');
    navigate('/home');
  }

 }



  return (
    <div>
      <Navbar2 />


      <br />
      <br />

        <div className="container">
          <form className="row g-3" onSubmit={handleSubmit(placeOrder)}>
            <div className="col-md-6">
              <label htmlFor="inputName" className="form-label">
                <b>Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                defaultValue={userDetails?.Name}
                placeholder="Enter your name"
                {...register("inputName", {
                  required: "Please Enter name",
                })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmail" className="form-label">
                <b>Email</b>
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                defaultValue={userDetails?.Email}
                placeholder="Enter your email"
                {...register("inputEmail", {
                  required: "Please enter Email",
                })}
              />
            </div>

            <div className="col-6">
              <label htmlFor="inputMobile" className="form-label">
                <b>Mobile Number</b>
              </label>
              <input
                type="tel"
                className="form-control"
                id="inputMobile"
                placeholder="Enter your mobile number"
                {...register("inputMobile", {
                  required: "Please enter Mobile number",
                })}
              />
            </div>

            
            <div className="form-group col-md-6">
              <label className="mb-1">Payment Method</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  defaultChecked
                  {...register("paymentMethod")}
                  value="online"
                  onChange={(e) => onPaymentMethodChange(e)}
                />
                <label className="form-check-label">Online Payment</label>
                <br />
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  {...register("paymentMethod")}
                  value="cod"
                  onChange={(e) => onPaymentMethodChange(e)}
                />
                <label className="form-check-label">Cash on Delivery</label>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">
                <b>Address</b>
              </label>
              <textarea
                type="text"
                className="form-control"
                id="inputAddress"
                rows={2}
                placeholder="Enter your address"
                {...register("inputAddress", {
                  required: "Please enter Address",
                })}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputState" className="form-label">
                <b> State</b>
              </label>
              <select id="inputState" className="form-select">
                <option defaultValue> --- state---</option>
                {IndianStates.map((obj) => (
                  <option key={obj.code} value={obj.name}>
                    {obj.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="inputZip" className="form-label">
                <b> Pincode</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="inputZip"
                defaultValue={user?.user_Data?.Pincode}
                {...register("inputZip")}
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                {preceedOnline?"Proceed To Pay":"Place Order"}
              </button>
            </div>
          </form>
        </div>

        


    </div>
  );
}

export default Checkout;
