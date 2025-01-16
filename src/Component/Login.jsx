import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from'axios';

function Login() {
  const [values, setValues] = useState({
    email: "",
    matkhau: ""
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:4000/login", values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/');
        } else {
          alert("Tài khoản hoặc mật khẩu không đúng");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Có lỗi xảy ra trong quá trình đăng nhập.");
      });
  };

  const handleSubmit = (e) => {
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <Header/>
          <div className="row m-5 no-gutters shadow-lg">
      <div className="col-md-6 d-none d-md-block">
        <img
          src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
          className="img-fluid"
          style={{ minHeight: "100%" }}
        />
      </div>
      <div className="col-md-6 bg-white p-5">
        <h3 className="pb-3 ">Login Form</h3>
        <div className="form-style">
          <form onSubmit={handleLogin} >
            <div className="form-group pb-3">
              <input
              type="text"
                name="email"
                placeholder="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleSubmit}
               
              />
            </div>
            <div className="form-group pb-3">
              <input
                name="matkhau"
                type="password"
                placeholder="matkhau"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleSubmit}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              {/* <div className="d-flex align-items-center">
                <input name="" type="checkbox" defaultValue="" />{" "}
                <span className="pl-2 font-weight-bold">Remember Me</span>
              </div> */}
              
            </div>
            <div className="pb-2">
              <button
                type="submit"
                className="btn btn-dark w-100 font-weight-bold mt-2"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="sideline">OR</div>
          <Link to="/resigter">
          <div>
            <button
              type="submit"
              className="btn btn-primary w-100 font-weight-bold mt-2"
            >       
              <i className="fa fa-facebook" aria-hidden="true" /> Create Account
            </button>
          </div>
          </Link>
          <div className="pt-4 text-center">
            Get Members Benefit. <a href="#">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login