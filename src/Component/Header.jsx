import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Header() {
  const [name, setName] = useState('');
  const [auth, setAuth] = useState(false);
  const [makh, setMakh] = useState(''); // Lưu mã khách hàng (makh)

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:4000/logout')
      .then(() => window.location.reload(true))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get('http://localhost:4000/auth');
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          setMakh(res.data.makh); // Lưu mã khách hàng
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, []);

  return (
    <header className="bg-dark p-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand text-white">Zeref</Link>

        <nav className="d-flex gap-3">
          <Link to="/Product" className="nav-link text-white">Sản Phẩm</Link>
          {auth && (
            <Link to={`/showhoadon/${makh}`} className="nav-link text-white">Hóa Đơn</Link> // Chuyển hướng đúng với mã khách hàng
          )}
        </nav>

        <div className="d-flex align-items-center gap-3">
          {auth ? (
            <>
              <span className="text-white">Xin chào, {name}</span>
              <button className="btn btn-danger" onClick={handleLogout}>Đăng Xuất</button>
            </>
          ) : (
            <Link to="/login" className="text-white">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
          <Link to="/cart" className="text-white">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
