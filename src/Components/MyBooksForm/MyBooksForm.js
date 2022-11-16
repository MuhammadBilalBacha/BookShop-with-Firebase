import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import firebaseContext from "../../Context/Context";
import "./MyBooksForm.css";

const MyBooksForm = () => {
  const [name, setName] = useState("");
  const [bookno, setBookno] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const { AllContext } = useContext(firebaseContext);

  const booksHandler = async (e) => {
    e.preventDefault();
    await AllContext.addBooks(name, bookno, price, file);

    setName("");
    setBookno("");
    setPrice("");
    setFile("");
    toast.success("Your book is now published ");
  };
  return (
    <div className="container signup py-5">
      <div className=" py-2">
        <div className="d-flex justify-content-center">
          <div className="col-md-6 myForm ">
            <h4 className="text-center py-2">Add your book here</h4>

            <form className="" onSubmit={booksHandler}>
              <div className="form-group mx-4 my-3">
                <label htmlFor="" className="py-2">
                  Your Book Name
                </label>
                <input
                  type="text"
                  placeholder="enter your book name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mx-4 my-3">
                <label htmlFor="" className="py-2">
                  No of book
                </label>
                <input
                  type="number"
                  placeholder="enter your book number"
                  className="form-control"
                  value={bookno}
                  onChange={(e) => setBookno(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mx-4 my-3">
                <label htmlFor="" className="py-2">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="enter your book price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mx-4 my-3">
                <label htmlFor="" className="py-2">
                  Book Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>
              <div className="form-group pb-5 mx-4">
                <input
                  type="submit"
                  value="Add your book"
                  className="btn text-white btn-success"
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooksForm;
