import React, { useContext, useEffect, useState } from "react";
// import OrderCard from "../../Components/OrderCard/OrderCard";
import { Row, Col } from "react-bootstrap";
import firebaseContext from "../../Context/Context";
import BookCard from "../../Components/BookCard/BookCard";

const Order = () => {
  const { AllContext } = useContext(firebaseContext);
  const [book, setBook] = useState([]);

  useEffect(() => {
    if (AllContext.authUser) {
      AllContext.readOrders().then((order) => {
        //   console.log(order.docs);
        setBook(order.docs);
      });
    }
  });

  return (
    <div className="container">
      <h1 className="text-white text-center py-5">My All Books</h1>
      <Row>
        {book.map((bok) => {
          return (
            <Col md={4} key={bok.id}>
              <BookCard
                link="orders/book/"
                id={bok.id}
                btnname="View Orders"
                {...bok.data()}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Order;
