import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from'axios';

function Resigter() {
  const [values,setValues]=useState({
    name:'',
    email:'',
    phone:'',
    password:'',
    
  })
  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post("http://localhost:4000/resigter",values)
    window.location.reload()
  }
  
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
        <h3 className="pb-3">Login Form</h3>
        <div className="form-style">
        <form onSubmit={handleSubmit}>
            <div className="form-group pb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                
                onChange={(e)=>{setValues({... values,email:e.target.value})}}
                
              />
            </div>
            <div className="form-group pb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                id="exampleInputPassword1"
                
                onChange={(e)=>{setValues({... values,password:e.target.value})}}
              />
            </div>
            <div className="form-group pb-3">
              <input
                type="Phone"
                placeholder="Phone"
                className="form-control"
                id="exampleInputPassword1"
                
                onChange={(e)=>{setValues({... values,phone:e.target.value})}}
                
              />
            </div>
            <div className="form-group pb-3">
              <input
                type="Name"
                placeholder="Name"
                className="form-control"
                id="exampleInputPassword1"
                
                onChange={(e)=>{setValues({... values,name:e.target.value})}}
                
              />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <input name="" type="checkbox" defaultValue="" />{" "}
                <span className="pl-2 font-weight-bold">Remember Me</span>
              </div>
              <div>
                <a href="#">Forget Password?</a>
              </div>
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
          <Link to="/login">
          <div>
            <button
              type="submit"
              className="btn btn-primary w-100 font-weight-bold mt-2"
            >       
              <i className="fa fa-facebook" aria-hidden="true" /> Login
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

export default Resigter