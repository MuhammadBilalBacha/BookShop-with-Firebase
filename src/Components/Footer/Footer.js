import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      className="container py-2 mt-5 mb-2 text-center"
      style={{ backgroundColor: "rgb(148, 79, 37)" }}
    >
      <div className="d-flex justify-content-center py-2 ">
        <div className="col-md-10">
          <h3 className="text-white">
            Made by Muhammad Bilal{" "}
            <span className="mx-2">
              <FaHeart className="text-danger" />
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
