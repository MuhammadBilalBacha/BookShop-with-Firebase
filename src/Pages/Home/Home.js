import React, { useContext, useEffect, useState } from "react";
import BookCard from "../../Components/BookCard/BookCard";
import firebaseContext from "../../Context/Context";
// import  from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
// import bookImage from "./booktwo.jpg";
import spinner from "./Spinner.gif";
const Home = () => {
  const { AllContext } = useContext(firebaseContext);
  const [books, setBooks] = useState([]);
  // const [imageurl, setUrl] = useState(null);
  const [spiner, setSpinner] = useState(true);
  useEffect(() => {
    AllContext.readBooks().then((book) => {
      // console.log(book.docs);

      setBooks(book.docs);
      if (book) {
        setSpinner(false);
      }
      // book.docs.map((bk) => {
      //   // console.log(bk.data());

      //   return bk;
      // });
    });
  }, [AllContext]);

  return (
    <section className="Home">
      <div className="container">
        <h1 className="mybooks py-3 text-center">Books List</h1>
        <div className="text-center">
          {spiner && <img src={spinner} alt="Loading..." />}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
      </div>
      <Row>
        {books.map((book) => {
          return (
            <Col md={4} key={book.id}>
              <BookCard
                link="/books/details/"
                btnname="View Details"
                id={book.id}
                {...book.data()}
              />
            </Col>
          );
        })}
      </Row>
      {/* <div className="container">
        <h1 className="mybooks text-center">My Books List</h1>
        {spiner && (
          <div className="text-center py-5">
            {" "}
            <img className="text-center" src={spinner} alt="Missing spinner" />
          </div>
        )}
        <div className="row">
          {books.map((book) => {
            const khan = AllContext.getImage(book.data().imageURL);
            console.log(khan);
            const ashna = () => {
              khan.then((im) => {
                console.log(im);

                return <img src={im} />;
              });
            };
            ashna()
            .then((url) => {
              setUrl(url);
              console.log(url);
            });
            if (book) {
              setSpinner(false);
            }
            return (
              <div className="col-md-4 py-3" key={book.data().imageURL}>
                <div className="myrow">
                  {url.forEach((ur) => {
                    return <img src={ur} alt="ImageMissing" />;
                  })}
                  <img src={imageurl} alt="" />
                  <div className="myrow">
                    <h5 className="text-center myrow text-white">
                      <span className="myrow">Upload by : </span>
                      {book.data().displayName}
                    </h5>
                  </div>
                  <div className="text-white py-3 text-center  myrow">
                    {book.data().bkno}
                  </div>
                  <div className="text-white text-center  myrow">
                    {book.data().name}
                  </div>
                  <div className="text-white text-center py-3  myrow">
                    {book.data().price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </section>
  );
};

export default Home;
