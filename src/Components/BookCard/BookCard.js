import React, { useContext, useEffect, useState } from "react";
import firebaseContext from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const [imageurl, setUrl] = useState(null);
  const { AllContext } = useContext(firebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    AllContext.getImage(props.imageURL).then((url) => {
      return setUrl(url);
    });
  }, [AllContext, props.imageURL]);

  const viewHandler = (viewHandler) => {
    console.log(viewHandler);
    navigate(`${props.link}${viewHandler}`);
  };

  return (
    <section className="Home">
      <div className="container">
        <div className="row">
          <div className=" py-3">
            <div className="myrow">
              <img src={imageurl} alt="" />
              <div className="myrow py-2">
                {/* <h5 className="text-center myrow text-white">
                  <span className="myrow">Uploaded by : </span>
                  {props.displayName}
                </h5> */}
              </div>
              {/* <div className="text-white py-3 text-center  myrow">
                <span className="text-white myrow">Book No : </span>
                {props.bkno}
              </div> */}
              <div className="text-white text-center  myrow">
                <span className="text-white myrow">Book Name : </span>
                {props.name}
              </div>
              <div className="text-white text-center py-3 myrow">
                {" "}
                <span className="text-white myrow">Price : pkr </span>
                {props.price}
              </div>
              <div className="text-center myrow">
                <button
                  className="btn btn-success my-3 text-center"
                  onClick={() => viewHandler(props.id)}
                >
                  {props.btnname}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookCard;
