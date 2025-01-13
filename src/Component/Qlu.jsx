import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Headerad from './Headerad';

function Qlu() {
  const [user,setUser]=useState([]);
  const[values,setValues]=useState({
    email:'',
    phone:'',
    diachi:'',
    matkhau:''
  });
  const handleCreateu=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:4000/createu', values)
    .then(res=>window.location.reload())
  }
  const handleDeleteu=(makh)=>{
    
    axios.get('http://localhost:4000/deleteu/'+makh)
    .then(res=>window.location.reload())
  }
  useEffect(()=>{
    axios.get('http://localhost:4000/qlu')
    .then(res=>setUser(res.data))
  },[])

  function handleInput(e){
    setValues(prve=>({
      ...prve,[e.target.name]:[e.target.value]
    }))
  }
  return (
    
    <div>
      <Headerad/>
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
        <div className="col-9">
          <table className="table table-striped table-hover   ">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên </th>
                <th>Email </th>
                <th>Điện thoại </th>
                <th>địa chỉ </th>
                <th>Thao tác </th>
              </tr>
            </thead>
            {user.map((user,i)=>{
              return(

             
            <tbody>
              <tr>
                <td key={i}>{user.makh}</td>
                <td>{user.tenkh}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.diachi}</td>
                <td>
                  <div className="btn-group">
                    <div className="btn btn-warning sua">
                      {" "}
                      <Link to={`/Updateu/${user.makh}`}>
                      <button type="button"className="btn btn-warning btn-sm   ">  Sửa </button>{" "}
                      </Link>
                      
                    </div>
                    <div className="btn btn-danger btn-block xoa">
                      {" "}
                      <button type="button"className="btn btn-danger btn-sm   " onClick={()=>handleDeleteu(user.makh)}>  Xóa</button>
                    </div>
                  </div>
                </td>
              </tr>
             
             
            </tbody>
             )
            })}
          </table>
        </div>
        {/* het col 9       */}
        <div className="col-3">
          <div className="">
            <div className="card border-primary mb-3">
              <div className="card-header">Thêm mới user vào hệ thống </div>
              <div className="card-body text-primary">
                <form onSubmit={handleCreateu}>
                <div className="form-group" >
                  <input
                    type="text"
                    className="form-control"
                    name="tenkh"
                    id=""
                    aria-describedby="helpId"
                    placeholder="Tên User"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control "
                    name="email"
                    id=""
                    aria-describedby="helpId"
                    placeholder="Email "
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id=""
                    aria-describedby="helpId"
                    placeholder="Số điện thoại "
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="diachi"
                    id=""
                    aria-describedby="helpId"
                    placeholder="Địa chỉ"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="matkhau"
                    id=""
                    aria-describedby="helpId"
                    placeholder="mật khẩu "
                    onChange={handleInput}
                  />
                </div>
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
    </div>
  )
}

export default Qlu