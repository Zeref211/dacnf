import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

function ShowHoaDon() {
    const [name, setName] = useState('');
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [makh, setMakh] = useState('');
    const [hoadon, setHoadon] = useState([]);

    useEffect(() => {
        const checktoken = async () => {
            try {
                const res = await axios.get('http://localhost:4000/auth');
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                    setMakh(res.data.makh);
                    const hoadonRes = await axios.get(`http://localhost:4000/showhoadon/${res.data.makh}`);
                    setHoadon(hoadonRes.data);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            } catch (error) {
                console.error(error);
            }
        };
        checktoken();
    }, []);

    const uniqueMahd = [...new Set(hoadon.map((item) => item.mahd))];

    return (
        <div>
            <Header />
            <h2>Danh sách Hóa Đơn</h2>
            {uniqueMahd.map((mahd) => {
                const filteredHoadon = hoadon.filter((item) => item.mahd === mahd);

                return (
                    <div key={mahd} style={{ marginBottom: '20px' }}>
                        <h3>Hóa Đơn Mã: {mahd}</h3>
                        <p>Phương thức thanh toán: {filteredHoadon[0].phuongthucthanhtoan}</p>

                        <table className="invoice-table">
                            <thead>
                                <tr>
                                    <th>Mã Hóa Đơn</th>
                                    <th>Tên Khách Hàng</th>
                                    <th>Ngày Lập Hóa Đơn</th>
                                    <th>Trạng Thái</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Số Lượng</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHoadon.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.mahd}</td>
                                        <td>{name}</td>
                                        <td>{item.ngaylaphoadon}</td>
                                        <td>{item.trangthai}</td>
                                        <td>{item.tensp}</td>
                                        <td>{item.soluong}</td>
                                        <td>{item.gia}₫</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'right', fontWeight: 'bold' }}>Tổng Tiền:</td>
                                    <td style={{ fontWeight: 'bold' }}>
                                        {filteredHoadon[0]?.tongtien || 0}₫
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}

export default ShowHoaDon;
