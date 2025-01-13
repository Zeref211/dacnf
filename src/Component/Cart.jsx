import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [values, setValues] = useState('');
  const [product, setProduct] = useState([]);
  const [name, setName] = useState('');
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [makh, setMakh] = useState('');
  const [soluong, setSoluong] = useState(1);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [hoadon, setHoadon] = useState({
    tongsoluong: '',
    tongtien: '',
    ngaylaphoadon: '',
    mathanhtoan: 0,
    phuongthucthanhtoan: '',
    trangthai: '',
    manv: 3,
    makh: ''
  });
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const total = product.reduce((total, item) => total + item.gia * item.soluong, 0);
  const totalsoluong = product.reduce((total, item) => total + item.soluong, 0);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get('http://localhost:4000/auth');
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.name);
          setMakh(res.data.makh);
          const cartRes = await axios.get(`http://localhost:4000/showshowcart/${res.data.makh}`);
          setProduct(cartRes.data);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      } catch (error) {
        console.error('Lỗi khi xác thực:', error);
      }
    };

    checkToken();
  }, [soluong]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    setHoadon(prev => ({
      ...prev,
      makh: makh,
      ngaylaphoadon: currentDate,
      phuongthucthanhtoan: selectedValue,
      trangthai: 'Đợi Xác Nhận',
      tongsoluong: totalsoluong,
      tongtien: total
    }));
  }, [selectedValue, total, totalsoluong, currentDate, makh]);
  const handleCheckboxChange = async (e, item) => {
    if (e.target.checked) {
        
        try {
            await axios.post(`http://localhost:4000/updatetrangthai/${item.masp}/${item.size}`, {
                trangthai: 1  
            });
            setCheckedItems([...checkedItems, { ...item, trangthai: 1 }]);
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái sản phẩm:', error);
        }
    } else {
        
        try {
            await axios.post(`http://localhost:4000/updatetrangthai/${item.masp}/${item.size}`, {
                trangthai: 0  
            });
            setCheckedItems(checkedItems.filter(i => i.masp !== item.masp || i.size !== item.size));
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái sản phẩm:', error);
        }
    }
};

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const selectedProducts = product.filter(item => item.trangthai === '1');
 
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedValue === 'cod') {
      try {
        await axios.post('http://localhost:4000/addhoadon', hoadon);
        alert('Mua hàng thành công');
        // await axios.get(`http://localhost:4000/clearcart/${makh}`);
        setProduct([]);
      } catch (error) {
        console.error('Lỗi khi mua hàng COD:', error);
      }
    } else if (selectedValue === 'bank') {
      try {
        const paymentData = {
          amount: total.toString(),
          orderInfo: 'Thông tin đơn hàng',
          redirectUrl: 'http://localhost:3000/',
          ipnUrl: 'https://0778-14-178-58-205.ngrok-free.app/callback',
          requestType: 'payWithMethod',
          hoadon: hoadon,
        };
        const response = await axios.post('http://localhost:4000/payment', paymentData);
        window.location.href = response.data.payUrl;
        await axios.get(`http://localhost:4000/clearcart/${makh}`);
      } catch (error) {
        console.error('Lỗi khi thanh toán MoMo:', error);
      }
    }
  };

  return (
    auth ? (
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
            <tbody>
              {product.map((item, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          console.log(`Sản phẩm được chọn: ${item.tensp}`);
                        } else {
                          console.log(`Sản phẩm bị bỏ chọn: ${item.tensp}`);
                        }
                      }}
                    />
                  </td>
                  <td>{item.tensp}</td>
                  <td>
                    <div className="input-group" style={{ maxWidth: '150px' }}>
                      <button
                        className="btn btn-outline-primary js-btn-minus"
                        type="button"
                        onClick={() => {
                          const newQty = item.soluong - 1;
                          axios.post('http://localhost:4000/updatesl/', {
                            soluong: newQty,
                            masp: item.masp,
                            masize: item.size,
                          });
                          setSoluong(newQty);
                        }}
                        disabled={item.soluong <= 1}
                      >
                        −
                      </button>
                      <input type="text" className="form-control text-center" value={item.soluong} readOnly />
                      <button
                        className="btn btn-outline-primary js-btn-plus"
                        type="button"
                        onClick={() => {
                          const newQty = item.soluong + 1;
                          axios.post('http://localhost:4000/updatesl/', {
                            soluong: newQty,
                            masp: item.masp,
                            masize: item.size,
                          });
                          setSoluong(newQty);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{item.gia}</td>
                  <td>{item.sosize}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        axios
                          .get(`http://localhost:4000/deletecart/${item.masp}/${item.size}`)
                          .then(() => {
                            window.location.reload(); // Tải lại trang sau khi xóa
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="float-xs-right">Tổng tiền: {total}</div>
        </div>
        <button className="btn btn-success" onClick={handleSubmit}>Thanh toán</button>
        <label className={`btn btn-outline-primary ${selectedValue === 'cod' ? 'active' : ''}`}>
          <input
            type="radio"
            name="PTTT"
            value="cod"
            checked={selectedValue === 'cod'}
            onChange={handleChange}
          />
          Thanh toán khi nhận hàng
        </label><br />
        <label className={`btn btn-outline-primary ${selectedValue === 'bank' ? 'active' : ''}`}>
          <input
            type="radio"
            name="PTTT"
            value="bank"
            checked={selectedValue === 'bank'}
            onChange={handleChange}
          />
          Thanh Toán Qua MoMo
        </label>
      </div>
    ) : <Login />
  );
}

export default Cart;
