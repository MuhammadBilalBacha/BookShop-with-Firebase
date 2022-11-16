import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import firebaseContext from "../../Context/Context";
import user from "./man.png";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { useFirebase } from "../../Context/Context";
// import { firebaseContext } from "../../Context/Context";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { AllContext } = useContext(firebaseContext);
  console.log(AllContext.showing);

  const submitHandler = async (e) => {
    e.preventDefault();
    await AllContext.singUpUser(email, password);
    if (AllContext.showing) {
      toast.success(`Your account is now register with ${email} `);
    } else {
    }
  };
  useEffect(() => {
    if (AllContext.showing) {
      navigate("/login");
    }
  }, [AllContext.showing, navigate]);

  const backHandler = () => {
    navigate("/login");
  };

  return (
    <div className="container signup py-5">
      <div className=" py-2">
        <div className="d-flex justify-content-center">
          <div className="col-md-6 myForm ">
            <h4 className="text-center py-2">Register your account</h4>
            <div className="text-center ">
              <img className="user" src={user} alt="" />
            </div>
            <form className="" onSubmit={submitHandler}>
              <div className="form-group mx-4 my-3">
                <label htmlFor="" className="py-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="enter your email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mx-4 my-3">
                <label htmlFor="" className="py-2">
                  Password
                </label>
                <input
                  type="Password"
                  placeholder="enter your email"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mx-4">
                <p className="error">{AllContext.error}</p>
              </div>
              <div className="form-group pb-5 mx-4">
                <input
                  type="submit"
                  value="Register"
                  className="btn text-white btn-success"
                  required
                />
              </div>
              <div className="mx-4">
                <button
                  className="myBtn text-white mb-4 w-100"
                  onClick={backHandler}
                >
                  {" "}
                  <FaArrowCircleLeft className="mx-2 icon" />
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
