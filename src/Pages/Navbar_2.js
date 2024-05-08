import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../Context/Auth";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { removeCheckoutItems } from "../Components/Redux/Slices/UserSlice";

function Navbar_2(props) {
  const { user, setStatus, setUser, quant, setQuant } = useContext(AuthContext);
  const navigate = useNavigate();
  const userEmail = user?.user_Data?.Email;
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const [pageLocation, setPageLocation] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/Cart" || location.pathname === "/MyOrders") {
      setPageLocation(true);
    }
  }, [location]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const Quant = useSelector((state) => {
    return state.userItems.cartArray;
  });

  useEffect(() => {
    const tquantity = Quant.filter((item) => item.user === userEmail);
    const totalQuantity = tquantity.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );
    setQuant(totalQuantity);
  });

  const logOut = () => {
    localStorage.removeItem("login");
    setStatus(false);
    setUser(null);
    navigate("/");
  };

  const handleProductsOnSearch =(e) =>{
    let value = e.target.value;
    props.filterProductsOnSearch(value);

  }

  const navigateToCart = () => {
    dispatch(removeCheckoutItems());
    navigate("/Cart");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg   navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            Shopsify
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link text-white "
                  aria-current="page"
                  href="/home"
                >
                  Home
                </a>
              </li>
            </ul>
            <div>
              {pageLocation && (
                <form class="form-inline my-2 my-lg-0">
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search here.."
                    onChange={(e) => {
                      handleProductsOnSearch(e);
                    }}
                    aria-label="Search"
                  />
                </form>
              )}
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="nav-item position-relative">
              <img
                src="cart1.png"
                alt="cart"
                height="30px"
                width="30px"
                onClick={navigateToCart}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                  transform: isHovered ? "scale(1.2)" : "scale(1)",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <span
                className="position-absolute top-0 start-700 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7em" }}
              >
                {quant !== 0 && quant}
              </span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="nav-item dropdown">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "18px",
                  color: "white",
                }}
              >
                <VscAccount /> &nbsp;
                <a
                  className="nav-link dropdown-toggle"
                  href="userName"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.user_Data?.Name}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#" onClick={logOut}>
                      Log-Out
                    </a>
                  </li>
                  {/* <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here </a></li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar_2;
