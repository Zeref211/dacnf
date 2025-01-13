import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Sreach from "./Sreach";
import axios from "axios";


function Headerad() {
  const [name, setName] = useState("");
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [makh, setMakh] = useState("");
  axios.defaults.withCredentials = true;

  const handelDelete = () => {
    axios
      .get("http://localhost:4000/logout")
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const checktoken = async () => {
      try {
        const res = await axios.get("http://localhost:4000/authad");
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          setMakh(res.data.makh);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checktoken();
  }, []);

  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-decoration-none fs-4 fw-bold">
          Zeref
        </Link>

        {/* Navigation Menu */}
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/qlp" className="nav-link text-white">
                Quản lý sản phẩm
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/qlu" className="nav-link text-white">
                Quản lý user
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hoadon" className="nav-link text-white">
                Quản lý hóa đơn
              </Link>
            </li>
          </ul>
        </nav>

        {/* Search Component */}
        <Sreach />

        {/* User Actions */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/cart" className="text-white text-decoration-none">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          {auth ? (
            <>
              <span>{name}</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={handelDelete}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/loginad" className="text-white text-decoration-none">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Headerad;
