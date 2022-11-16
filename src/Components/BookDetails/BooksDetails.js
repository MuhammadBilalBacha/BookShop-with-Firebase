import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import firebaseContext from "../../Context/Context";
import "./BooksDetails.css";
import spinner from "../../Pages/Home/Spinner.gif";

const BooksDetails = () => {
  const param = useParams();
  const { AllContext } = useContext(firebaseContext);
  const [details, setDetails] = useState(null);
  const [url, setURL] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(false);

  //   console.log(param);
  const placeOrderHandler = async (e) => {
    e.preventDefault();

    if (quantity.length < 2) {
      return setError(true);
    } else {
      await AllContext.BookOrder(param.booksId, quantity);
      setError(false);
      toast.success("Your ordered is now placed");
    }
  };

  useEffect(() => {
    AllContext.getBookbyId(param.booksId).then((value) => {
      // console.log(value.data());
      setDetails(value.data());
    });
  }, [AllContext, param.booksId]);
  useEffect(() => {
    if (details) {
      AllContext.getImage(details.imageURL).then((url) => setURL(url));
    }
  }, [details, AllContext]);
  if (details === null) {
    return (
      <div className="text-center">
        <img src={spinner} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="text-white ">
      <h1 className="text-center"> Book Details</h1>
      <div className="d-flex justify-content-center text-center">
        <div className="col-md-10 mb-4 text-center">
          <div className="text-white forInput myname ">
            <h3>Book Name : {details.name}</h3>
          </div>
          <div>
            <img src={url} className="my" alt=" Missing" />
          </div>
          <div className="text-white py-2 mydetails">
            <h3 className=" mydetails">Book details</h3>
            <p className="py-1">Book Number : {details.bkno}</p>
            <p className="py-1">Price : {details.price}</p>
          </div>
          <div className="text-white py-2 mydetails ">
            <h3 className=" mydetails">Owner of Book</h3>
            {/* <img src={details.photoURL} alt="MissingImage" /> */}
            <p className=" py-1">Name : {details.displayName}</p>
            <p className="py-1 ">Email : {details.userEmail}</p>
          </div>
          <form action="">
            <input
              className="w-100  text-white"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="01"
              required
            />
            {error && (
              <p className="text-danger">
                Enter 1 to 10 number for ordering book
              </p>
            )}
            <button
              type="submit"
              className="w-100 py-2 my-2 btn btn-success"
              onClick={placeOrderHandler}
            >
              Buy Book
            </button>
          </form>
        </div>
      </div>
      {/* {details} */}
    </div>
  );
};

export default BooksDetails;
