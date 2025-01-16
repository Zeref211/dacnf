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
  const total = product
  .filter(item => item.trangthai === '1')
  .reduce((total, item) => total + item.gia * item.soluong, 0);
  const totalsoluong = product
  .filter(item => item.trangthai === '1') 
  .reduce((total, item) => total + item.soluong, 0);

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
    const newStatus = e.target.checked ? '1' : '0'; // Xác định trạng thái mới

    try {
      // Gọi API để cập nhật trạng thái sản phẩm
      await axios.post(`http://localhost:4000/updatetrangthai/${item.masp}/${item.size}`, {
        trangthai: newStatus,
      });

      // Cập nhật danh sách sản phẩm trong state
      setProduct((prevProducts) =>
        prevProducts.map((product) =>
          product.masp === item.masp && product.size === item.size
            ? { ...product, trangthai: newStatus }
            : product
        )
      );

      // Cập nhật danh sách sản phẩm đã được chọn
      setCheckedItems((prevItems) => {
        if (e.target.checked) {
          // Thêm vào danh sách nếu checkbox được chọn
          return [...prevItems, { ...item, trangthai: newStatus }];
        } else {
          // Loại bỏ khỏi danh sách nếu checkbox bị bỏ chọn
          return prevItems.filter((i) => i.masp !== item.masp || i.size !== item.size);
        }
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái sản phẩm:', error);
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const selectedProducts = product.filter(item => item.trangthai === '1');



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedValue === 'cod') {
        // Thanh toán COD
        const res = await axios.post('http://localhost:4000/addhoadon', hoadon);
        const mahd = res.data.data.insertId; // Lấy mahd từ phản hồi
  
        // Gọi API để cập nhật mahd vào giỏ hàng
        await axios.post(`http://localhost:4000/updatecartmahd`, { makh, mahd });
  
        alert('Mua hàng thành công');
        setProduct([]); // Xóa giỏ hàng trên giao diện
        navigate('/showhoadon/:makh');
        
      } else if (selectedValue === "bank") {
        const paymentResponse = await axios.post("http://localhost:4000/payment", {
          hoadon,
          amount: total.toString(), // Gửi tổng tiền
        });
        console.log("Phản hồi từ server:", paymentResponse.data);
        if (paymentResponse.data.payUrl) {
          // Chuyển hướng người dùng đến trang thanh toán MoMo
          window.location.href = paymentResponse.data.payUrl;
        } else {
          alert("Không thể tạo liên kết thanh toán. Vui lòng thử lại.");
          
        }
      }
    } catch (error) {
      console.error('Lỗi khi thanh toán:', error);
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
                      checked={item.trangthai === '1'}
                      onChange={(e) => handleCheckboxChange(e, item)}
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
