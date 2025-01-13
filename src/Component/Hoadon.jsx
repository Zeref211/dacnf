import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Loginad from './Loginad';
import Headerad from './Headerad';

function Hoadon() {
  const [values, setValues] = useState({
    tongsoluong: "",
    tongtien: "",
    ngaylaphoadon: "",
    mathanhtoan: "",
    phuongthucthanhtoan: "",
    trangthai: "",
    manv: "",
    makh: ""
  });
  const [hoadon, setHoadon] = useState([]);
  const [showform, setShow] = useState(false);
  const [mahoadon, setMaHoaDon] = useState("");
  const [nhanviens, setNhanviens] = useState([]);
  const [authad, setAuthad] = useState(false);
  const [taikhoannhanvien, setTaikhoannhanvien] = useState('');
  const navigate = useNavigate();

  const HandleUpdate = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/updatehoadon/" + mahoadon, values).then(() => {
      alert("Cập nhật thành công");
      window.location.reload();
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  useEffect(() => {
    const getAllNhanVien = async () => {
      try {
        const res = await axios.get("http://localhost:4000/nhanvien");
        setNhanviens(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllNhanVien();
  }, []);

  useEffect(() => {
    const checktoken = async () => {
      try {
        const res = await axios.get('http://localhost:4000/authad');
        if (res.data.Status === '1') {
          setTaikhoannhanvien(res.data.taikhoannhanvien);
          setAuthad(true);
        } else {
          console.log(res.data.message);
          setAuthad(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checktoken();
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:4000/logout')
      .then(res => {
        window.location.reload();
      }).catch(err => console.log(err));
  };

  useEffect(() => {
    const getAllHoaDon = async () => {
      try {
        const res = await axios.get("http://localhost:4000/hoadon");
        setHoadon(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllHoaDon();
  }, []);

  return (
      <div className="d-flex">
        <div id="content-wrapper" className="container mt-5">
        <Headerad/>
          <div id="content">
          </div>
          <div className="container mt-5">
            <div className="text-center mb-4">
              <h2 className="text-center mb-4">Sửa Hóa Đơn</h2>
              <form>
                <div className="form-group">
                  <label>Trạng Thái</label>
                  <select
                    className="form-control"
                    value={values.trangthai}
                    onChange={e => setValues({ ...values, trangthai: e.target.value })}
                  >
                    <option value="Đợi Xác Nhận">Đợi Xác Nhận</option>
                    <option value="Đã Hoàn Thành">Đang Giao Hàng </option>
                    <option value="Đã Giao Hàng">Đã Giao Hàng</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Mã Nhân Viên</label>
                  <select
                    className="form-control"
                    value={values.manv || ""}
                    onChange={e => setValues({ ...values, manv: e.target.value })}
                  >
                    <option value="">Chọn nhân viên</option>
                    {nhanviens.length > 0 ? (
                      nhanviens.map(nhanvien => (
                        <option key={nhanvien.manv} value={nhanvien.manv}>
                          {nhanvien.tennhanvien}
                        </option>
                      ))
                    ) : (
                      <option value="">Không có nhân viên</option>
                    )}
                  </select>
                </div>
              </form>
            </div>
            {showform && (
              <form onSubmit={HandleUpdate}>
                <h3 className="text-center mb-4">Cập Nhật Hóa Đơn</h3>
                <div className="form-group">
                  <label>Mã Hóa Đơn</label>
                  <input
                    type="text"
                    className="form-control"
                    value={mahoadon}
                    readOnly
                  />
                </div>
                <button type="submit" className="containerdongy d-flex=center">Cập Nhật</button>
              </form>
            )}
            <table className="table mt-5">
              <thead>
                <tr>
                  <th>Mã Hóa Đơn</th>
                  <th>Tổng Số Lượng</th>
                  <th>Tổng Tiền</th>
                  <th>Ngày Lập</th>
                  <th>Mã Thanh Toán</th>
                  <th>Phương Thức</th>
                  <th>Trạng Thái</th>
                  <th>Nhân Viên</th>
                  <th>Khách Hàng</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {hoadon.map(data => (
                  <tr key={data.mahd}>
                    <td>{data.mahd}</td>
                    <td>{data.tongsoluong}</td>
                    <td>{data.tongtien}</td>
                    <td>{formatDate(data.ngaylaphoadon)}</td>
                    <td>{data.mathanhtoan}</td>
                    <td>{data.phuongthucthanhtoan}</td>
                    <td>{data.trangthai}</td>
                    <td>{data.manv}</td>
                    <td>{data.makh}</td>
                    <td>
                      <button
                        className="btn btn-warning mr-2"
                        onClick={() => {
                          setShow(true);
                          setMaHoaDon(data.mahd);
                          setValues({
                            tongsoluong: data.tongsoluong,
                            tongtien: data.tongtien,
                            ngaylaphoadon: data.ngaylaphoadon,
                            mathanhtoan: data.mathanhtoan,
                            phuongthucthanhtoan: data.phuongthucthanhtoan,
                            trangthai: data.trangthai,
                            manv: data.manv,
                            makh: data.makh,
                          });
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => axios.get('http://localhost:4000/deletehoadon/' + data.mahd)
                          .then(res => window.location.reload())
                          .catch(err => console.log(err))}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default Hoadon;
