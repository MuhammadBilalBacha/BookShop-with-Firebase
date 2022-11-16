import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebaseContext from "../../Context/Context";
import "./OrderCard.css";

const OrderCard = () => {
  const param = useParams();
  const { AllContext } = useContext(firebaseContext);
  const [orders, setOrders] = useState([]);
  console.log(param);
  useEffect(() => {
    AllContext.getOrder(param.ordersId).then((order) => {
      console.log(order);
      setOrders(order.docs);
    });
  }, [AllContext, param.ordersId]);

  return (
    <div className="container">
      <p className="text-center fw-bold py-2 mb-5 orderTitle">
        Orders book by customer{" "}
      </p>
      <div className=" my-card text-center">
        {orders.map((ordr) => {
          return (
            <div
              className="col-md-6 mx-auto text-center text-white"
              key={ordr.id}
            >
              <div className="order mb-2 py-3">
                <h3 className=" my-card ">Order place by : </h3>
                <p className=" my-card ">Name : {ordr.data().displayName}</p>
                <p>
                  Email : <span> {ordr.data().userEmail}</span>
                </p>

                <h3>
                  Needed Quantity of Book : <span>{ordr.data().quantity}</span>
                </h3>
                <br />
              </div>
              {/* <hr /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderCard;
