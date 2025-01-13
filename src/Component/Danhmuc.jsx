import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [values, setValues] = useState('');
  const [product, setProduct] = useState([]);
  const [name, setName] = useState('');
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [makh, setMakh] = useState('');
  const [soluong, setSoluong] = useState(1);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedValue, setSelectedValue] = useState(''); // Lưu giá trị được chọn
  const [hoadon, setHoadon] = useState({
    tongsoluong: '',
    tongtien: '',
    ngaylaphoadon: '',
    mathanhtoan: 0,
    phuongthucthanhtoan: '',
    trangthai: '',
    manv: 3,
    makh: '',
  });

  axios.defaults.withCredentials = true;

  const total = product.reduce((total, item) => total + item.gia * item.soluong, 0);
  const totalsoluong = product.reduce((total, item) => total + item.soluong, 0);

  useEffect(() => {
    const checktoken = async () => {
      try {
        const res = await axios.get('http://localhost:4000/auth');
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.name);
          setMakh(res.data.makh);
          axios
            .get(`http://localhost:4000/showshowcart/${res.data.makh}`)
            .then((res) => setProduct(res.data));
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checktoken();
  }, [soluong]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    setHoadon((prev) => ({
      ...prev,
      makh: makh,
      ngaylaphoadon: currentDate,
      phuongthucthanhtoan: selectedValue,
      trangthai: 'Đợi Xác Nhận',
      tongsoluong: totalsoluong,
      tongtien: total,
    }));
    console.log(hoadon);
  }, [selectedValue, total, totalsoluong]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/addhoadon', hoadon).then((res) => alert('Mua hàng thành công'));
  };

  return auth ? (
    <div>
      <Header />
      <div className="col-12">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Check</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Size</th>
              <th>Xóa</th>
            </tr>
          </thead>
          {product.map((product, i) => (
            <tbody key={i}>
              <tr>
                <td></td>
                <td>{product.tensp}</td>
                <td>
                  <div className="input-group" style={{ maxWidth: '150px' }}>
                    <button
                      className="btn btn-outline-primary js-btn-minus"
                      type="button"
                      onClick={() => {
                        const newQty = product.soluong - 1;
                        axios.post('http://localhost:4000/updatesl/', {
                          soluong: newQty,
                          masp: product.masp,
                          masize: product.size,
                        });
                        setSoluong(newQty);
                      }}
                    >
                      −
                    </button>
                    <input type="text" className="form-control text-center" value={product.soluong} readOnly />
                    <button
                      className="btn btn-outline-primary js-btn-plus"
                      type="button"
                      onClick={() => {
                        const newQty = product.soluong + 1;
                        axios.post('http://localhost:4000/updatesl/', {
                          soluong: newQty,
                          masp: product.masp,
                          masize: product.size,
                        });
                        setSoluong(newQty);
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{product.gia}</td>
                <td>{product.sosize}</td>
                <td>
                  <p
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      axios
                        .get(`http://localhost:4000/deletecart/${product.masp}/${product.size}`)
                        .then(() => {
                          window.location.reload();
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    X
                  </p>
                </td>
              </tr>
            </tbody>
          ))}
          <div className="float-xs-right">Tổng tiền: {total}</div>
        </table>
      </div>
      <button className="btn btn-success" onClick={handleSubmit}>
        Thanh toán
      </button>
      <label className={`btn btn-outline-primary ${selectedValue === 'cod' && auth ? 'active' : ''}`}>
        <input
          type="radio"
          name="PTTT"
          value="cod"
          checked={selectedValue === 'cod'}
          onChange={handleChange}
          disabled={!auth}
        />
        COD
      </label>
      <br />
      <label className={`btn btn-outline-primary ${selectedValue === 'bank' ? 'active' : ''}`}>
        <input type="radio" name="PTTT" value="bank" checked={selectedValue === 'bank'} onChange={handleChange} />
        Thanh Toán Qua MoMo
      </label>
    </div>
  ) : (
    <Login />
  );
}

export default Cart;
