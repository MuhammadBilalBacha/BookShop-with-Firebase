import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import user from "../Register/man.png";
import firebaseContext from "../../Context/Context";
import googlebutton from "../Register/google-signin-button.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { AllContext } = useContext(firebaseContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    await AllContext.loginUser(email, password);
    // if (AllContext.showing) {
    //   navigate("/");
    // }
  };
  const googleHandler = async (e) => {
    e.preventDefault();
    await AllContext.signInWithGoogle();
    // if (AllContext.showing) {
    //   navigate("/");
    // }
  };
  useEffect(() => {
    if (AllContext.showing) {
      navigate("/");
    }
  }, [AllContext.showing, navigate]);

  const registerHandler = () => {
    navigate("/register");
  };

  return (
    <div className="container login py-5">
      <div className=" py-2">
        <div className="d-flex justify-content-center">
          <div className="col-md-6 myForm ">
            <h4 className="text-center py-2">Login to your account</h4>
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
                  required
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
              <div className="form-group pt-4 pb-2 mx-4">
                <input
                  type="submit"
                  value="Login"
                  className="btn text-white btn-success "
                />
              </div>
            </form>
            <div className="mx-4 d-fex">
              <button
                className="myBtn text-white  mb-4 "
                onClick={registerHandler}
              >
                Click here to register
              </button>
              <h1 className="text-center">OR</h1>
            </div>

            <div className="button text-center mb-3">
              <button onClick={googleHandler}>
                {" "}
                <img className="btnImage" src={googlebutton} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
