import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import {FetchData} from '../FetchData';
import DataView from './DataView';
import ProductModal from '../Components/Modals/ProductModal';
import TopLoadingBar from 'react-top-loading-bar';
import AuthContext from '../Context/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct,updateProductQuantity,removeProduct } from '../Components/Redux/Slices/UserSlice';
import ProfileModal from '../Components/Modals/ProfileModal';


function Home() {

  const [data,setData] = useState([]);
  const [filteredData,setFilteredData] =useState([]);
  const [topLoading, setTopLoading] = useState(0);
  const [Modal,setModal] = useState(false);
  const [modalDetailsId,setModalDetailsId] = useState(null);
  const [modalTitle,setModalTitle] = useState(null);
  const [modalDesc,setModalDesc] = useState(null);
  const [modalQuantityDetails,setModalQuantityDetails] = useState(null);
  const [productImage,setProductImage] = useState(null);
  const [userCart,setUserCart]= useState(null);

  const {user,profileModal} = useContext(AuthContext);

  const dispatch= useDispatch();
  
  const userEmail = user?.user_Data?.Email;

  let myCart = useSelector((state) =>{   
    return (state.userItems).cartArray;
  })

  useEffect(()=>{
  
    let cart = myCart.filter(item=>item.user===userEmail).map(item=>({ product: item.product, quantity: Number(item.quantity)}));
    setUserCart(cart);
  },[myCart,userEmail])

  useEffect(()=>{
    const fetchAndSetData = async ()=>{
      try{
        setTopLoading(5);
        const fetch = await FetchData();
        setData(fetch);
        setFilteredData(fetch);
      }
      catch(error){
        console.error('Error fetchinf data:',error);
      }finally{
        setTopLoading(100);
      }     
    }
    
    fetchAndSetData();
  },[]);

  const mainModal = () =>(
    <ProductModal 
    productQuantity={modalQuantityDetails}
    productid={modalDetailsId} 
    productTitle={modalTitle} 
    productDesc={modalDesc} 
    productImg={productImage}
    addProductToCart={addProductToCart}
    deleteProduct={deleteProduct}
    closeModal={closeModal}/>
  )

  const handleCategoryChange = (category)=>{
    const filteredItems = data.filter(item =>item.category ===category)
    setFilteredData(filteredItems)

  }

  const openModalDetails= (id,title,desc,image,quantityOF) =>{
    setModalQuantityDetails(quantityOF);
    setModalDetailsId(id);
    setModalTitle(title);
    setModalDesc(desc);
    setProductImage(image);
    setModal(true);
  } 
  
  const closeModal = () =>{
    setModal(false);
  }


  const addProductToCart=(id)=>{
    
    let quantity = Number(userCart.filter(item =>item.product.id===id).map(item=>item.quantity));    
    quantity = (quantity === 0 || quantity === null)? Number(1) : quantity+1;
    
    if(quantity>1){     
      
      dispatch(updateProductQuantity({quantity,id,userEmail}));
    }
    else{
      const itemId = filteredData.filter(item=>item.id===id);
      let cartObj = {
        "user":userEmail,
        "product": itemId[0],
        "quantity":1
      }
      
      dispatch(addProduct(cartObj));
    }
  }


  const removeProductFromCart = (id)=>{
    let index = myCart.findIndex(obj=> obj.user===userEmail && obj.product.id===id);
    dispatch(removeProduct(index));
  }

  const deleteProduct=(id)=>{
    let quantity = Number(userCart.filter(item=>item.product.id===id).map(item=>item.quantity));
    quantity=quantity > 1 ? Number(quantity-1) : 0;
    if(quantity===0){
      removeProductFromCart(id);
    }
    else{
     
      dispatch(updateProductQuantity({quantity,id,userEmail}));
    }
  }

  return (
    
    <div>
      
      {Modal && mainModal()}
      {profileModal && <ProfileModal></ProfileModal>}

      <Navbar onCategoryChange={handleCategoryChange} />
      
      <div className="row">
      <TopLoadingBar
        progress={topLoading}
        color="#f11946"
        height={1.5}
      />

        {filteredData.map((item) =>(
        
        <div key={item.id} className="col-md-4"> 
        <DataView 
        id={item.id} 
        title={item.title} 
        image={item.image} 
        desc={item.description}
        price={item.price} 
        openModalDetails={openModalDetails} 
        addProductToCart={addProductToCart} 
        deleteProduct={deleteProduct}
        quantity={userCart.filter(obj=>obj.product.id===item.id).map(obj=>Number(obj.quantity))}/>
        </div>
        ))}
      
      </div>   
    </div>

 
  )
}

export default Home