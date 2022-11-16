import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebaseContext from "../../Context/Context";
import "./Navbar.css";

const Navbar = () => {
  const { AllContext } = useContext(firebaseContext);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  //  const { AllContext } = useContext(firebaseContext);
  useEffect(() => {
    if (AllContext.authUser) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [AllContext]);

  const logoutHandler = () => {
    AllContext.logout();
    navigate("/login");
  };
  return (
    <div className="navbarremove">
      <nav className="navbar fixed-top mb-5 navbar-expand-lg d-flex justify-content-center mynavbar">
        <div className="container-fluid py-2 mycontainer col-md-9">
          {/* <Link className="navbar-brand fw-bold text-white " href="/">
            BooksApp
          </Link> */}

          <Link className="nav-link fw-bold text-white " to="/">
            BooksShop
          </Link>

          <button
            className="navbar-toggler mybtn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon khan"></span>
          </button>
          <div className="collapse myAllLinks navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              {show && (
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
              )}
              {show && (
                <li className="nav-item">
                  <Link className="nav-link" to="/book/form">
                    Add books
                  </Link>
                </li>
              )}
              {show && (
                <li className="nav-item">
                  <Link className="nav-link" to="orders/book">
                    My Orders
                  </Link>
                </li>
              )}
              {!show && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {show && (
                <li className="nav-item">
                  <Link className="nav-link" to="/book/form">
                    <button onClick={logoutHandler}>Logout</button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
