import './App.css';
import LoginForm from './Components/LoginForm';
import Protected from './Components/Protected';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyOrders from './Pages/MyOrders';


function App() {
  return (    
    <Router>
      <div >
      
        <Routes>

        <Route path="/" element={<LoginForm/>}/>
        <Route path="/home" element={<Protected><Home/></Protected>}/>
        <Route path="/Cart" element={<Protected><Cart/></Protected>}/>
        <Route path="/Checkout" element={<Protected><Checkout/></Protected>}/>
        <Route path="/MyOrders" element={<Protected><MyOrders/></Protected>}/>


        </Routes>
        
      </div>
    </Router>
 
    
 
  );
}

export default App;
