import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import Sreach from './Sreach';
import axios from 'axios';

function Header() {
  const [name,setName]=useState('');
  const[auth,setAuth]=useState(false); 
  const[message,setMessage]=useState('');
  const[makh,setMakh]=useState('');
  axios.defaults.withCredentials = true;
  const handelDelete=()=>{
    axios.get('http://localhost:4000/logout')
    .then(res => window.location.reload(true))
    .catch(err => console.log(err))
  }
  useEffect(()=>{
    const checktoken = async() => {
      try {
        const res = await axios.get('http://localhost:4000/auth')
        if(res.data.Status ==="Success"){
          setAuth(true)
          setName(res.data.name)
          setMakh(res.data.makh)
        }else{
          setAuth(false)
          setMessage(res.data.Error)
        }
      } catch (error) {
        console.log(error);
      }
    }
    checktoken()
  },[])
  
  return (
    <div>
         <>
  
  <div>
<header className="header">
  <Link to="/" className="logo">Zeref</Link>
  <nav className="menu">
    <Link to="/Product">Product</Link>
    
    <a href="#">Aubot</a>
    <a href="#">Contact</a>
    <a href="#">Mail</a>
  </nav>
  {/* <Sreach/> */}
  <div className="right">
    
    <Link to ="">
    {name}
   
    
    </Link>
    <Link to ="/login">
    <FontAwesomeIcon icon={faUser} />
    </Link>
    <Link to ="/cart">
    <FontAwesomeIcon icon={faCartShopping} />
    </Link>
   
  
  </div>
 {auth && (
          <button className="btn btn-danger nav-item w-20 dangxuat" onClick={handelDelete}>Đăng xuất</button>
        )}</header>

</div>
</>

    </div>
  )
}

export default Header