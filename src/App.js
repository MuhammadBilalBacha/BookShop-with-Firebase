import { Fragment, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import BooksDetails from "./Components/BookDetails/BooksDetails";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import OrderCard from "./Components/OrderCard/OrderCard";
import firebaseContext from "./Context/Context";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import MyBooksFormPage from "./Pages/MyBooksFormPage/MyBooksFormPage";
import Order from "./Pages/MyOrders/Order";
import SignUp from "./Pages/Register/SignUp";

function App() {
  const [show, setShow] = useState(false);
  const { AllContext } = useContext(firebaseContext);
  useEffect(() => {
    if (AllContext.authUser) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [AllContext]);

  return (
    <Fragment>
      <ToastContainer />

      <Navbar />
      <div className="container">
        <Routes>
          {show && <Route path="/" element={<Home />} />}
          {show && <Route path="/book/form" element={<MyBooksFormPage />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/books/details/:booksId" element={<BooksDetails />} />
          <Route path="orders/book" element={<Order />} />
          <Route
            path="orders/book/orders/book/:ordersId"
            element={<OrderCard />}
          />
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        </Routes>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
