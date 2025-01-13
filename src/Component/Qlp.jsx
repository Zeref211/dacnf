import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Headerad from './Headerad';

function Ql() {
  const [showform, setShow] = useState(false);
  const [product, setProduct] = useState([]);
  const [id_giay, setidGiay] = useState("");
    const [id_size, setidSize] = useState("");
  const [values, setValues] = useState({
    masp: "",
    tensp: "",
    gia: "",
    hinh: "",
    mota: "",
    maloaisp:"",
    
  });
  const navigate = useNavigate()
  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/createp', values)

    
  }
  useEffect(() => {
    axios.get('http://localhost:4000/qlp')
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, [])
  const handleDeletep = (masp) => {
    axios.get('http://localhost:4000/deletep/' + masp)
      .then(res => window.location.reload())
  }
  function handleInput(e) {
    setValues(prev => ({
      ...prev,
      [e.target.name]: [e.target.value]
    }))
  }
  return (
    <div>
      <Headerad/>
      <>
        <div className="jumbotron jumbotron-fluid">
          <div className="container text-center">
            <h1 className="display-3">Project quản lý thành viên bằng React JS</h1>
            <p className="lead"> với dữ liệu json</p>
            <hr className="my-2" />
          </div>
        </div>
        <div className="searchForm">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <div className="btn-group">
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id=""
                      aria-describedby="helpId"
                      placeholder="Nhập từ khoá  "
                      style={{ width: 610 }}
                    />
                    <div className="btn btn-info"> Tìm</div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <hr />
              </div>
              {showform && (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                axios.post(`http://localhost:4000/updatesoluong/${values.masp}/${values.masize}`, { soluong: values.soluong, }).then(() => {
                                    alert("thành công");
                                    window.location.reload();
                                });
                            }}>
                                <h3>Cập Nhật Số Lượng</h3>
                                <label>Số Lượng</label>
                                <input
                                    type="number"
                                    value={values.soluong}
                                    onChange={(e) => setValues({ ...values, soluong: e.target.value })}
                                />
                                <button type="submit">Cập Nhật</button>
                            </form>
                        )}
              <div className="col-9">
                <table className="table table-striped table-hover   ">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên </th>
                      <th>Giá </th>
                      <th>Hình </th>
                      <th>Mô tả </th>
                      <th>Số lượng  </th>
                      <th>Size </th>
                      <th>Mã loại sản phẩm </th>
                    </tr>
                  </thead>



                  <tbody>
                    {product.map((product, i) => {
                      return (
                        <tr>
                          <td key={i}>
                            {product.masp}
                          </td>
                          <td>{product.tensp}</td>
                          <td>{product.gia}</td>
                          <td>{product.hinh}</td>
                          <td>{product.mota}</td>
                          <td>{product.soluong}</td>
                          <td>{product.sosize}</td>
                          <td>{product.maloaisp}</td>
                          <td>
                            <div className="btn-group">
                              <div className="btn btn-warning sua">
                                {" "}
                                <Link to={`/Updatep/${product.masp}`}><button type="button" className="btn btn-warning btn-sm">Sửa</button></Link>
                                
                              </div>
                              <div className="btn btn-danger btn-block xoa">
                                {" "}
                                <button type="button" onClick={() => handleDeletep(product.masp)} className="btn btn-danger btn-sm">Xóa</button>
                              </div>
                              <div className="btn btn-success  suasizesuasize">
                                {" "}
                                <button type="button"  className="btn btn-success btn-sm"onClick={() => {
                                                    setShow(true);
                                                    setidGiay(product.masp);
                                                    setidSize(product.masize);
                                                    setValues({
                                                        masp: product.masp,
                                                        masize: product.masize,
                                                        soluong: product.soluong
                                                    });
                                                }}>sửa size</button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>

                </table>
              </div>
             
              {/* het col 9       */}
              <div className="col-3">
                <div className="">
                  <div className="card border-primary mb-3">
                    <div className="card-header">Thêm mới sản phẩm vào hệ thống </div>
                    <div className="card-body text-primary">
                      <form onSubmit={handleCreate}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="masp"
                            id="masp"
                            aria-describedby="helpId"
                            placeholder="Mã sản phẩm"
                            onChange={handleInput}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="tensp"
                            id="tensp"
                            aria-describedby="helpId"
                            placeholder="Tên sản phẩm"
                            onChange={handleInput}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="gia"
                            id="gia"
                            aria-describedby="helpId"
                            placeholder="Giá "
                            onChange={handleInput}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="hinh"
                            id="hinh"
                            aria-describedby="helpId"
                            placeholder="Hình"
                            onChange={handleInput}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="mota"
                            id="mota"
                            aria-describedby="helpId"
                            placeholder="Mô tả"
                            onChange={handleInput}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="maloaisp"
                            id="maloaisp"
                            aria-describedby="helpId"
                            placeholder="mã loại sp"
                            onChange={handleInput}
                          />
                        </div>
                        {/* <div className="form-group">
                  <select className="custom-select" required="" name="maloaisp">
                    <option value="">Mã loại sản phẩm</option>
                    <option value="nike">Nike</option>
                    <option value="jd">Jordan</option>
                  </select>
                </div> */}
                        
                        <div className="form-group">
                          <button className="btn btn-block btn-primary"> Thêm</button>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
              {/* het col 3 */}
            </div>
          </div>
        </div>
        {/* end searchForm  */}
      </>
    </div>
  )
}

export default Ql