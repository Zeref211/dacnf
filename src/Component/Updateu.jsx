import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function Updateu() {
    const [user,setUser]=useState({
        tenkh:"",
        email:"",
        phone:"",
        diachi:"",
        matkhau:""
    });
    const parmas=useParams();
    const id=parmas.id
    const handleCreateu=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:4000/updateu/'+id,user);
    }
    function handdleSubmit(e){
        setUser(prve=>({...prve,[e.target.name]:[e.target.value] }))
    }
  return (
    <div>
          <div className="">
            
            <div className="card border-primary mb-3">
              <div className="card-header text-center">Sửa khách hàng</div>
              <div className="card-body text-primary">
              
                <form onSubmit={handleCreateu}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="tenkh"
                    id="tensp"
                    aria-describedby="helpId"
                    placeholder="tên khách hàng"
                    onChange={handdleSubmit}
                    
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    aria-describedby="helpId"
                    placeholder="email"
                    onChange={handdleSubmit}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    aria-describedby="helpId"
                    placeholder="phone  "
                    onChange={handdleSubmit}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="diachi"
                    id="diachi"
                    aria-describedby="helpId"
                    placeholder="Địa chỉ "
                    onChange={handdleSubmit}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="matkhau"
                    id="matkhau"
                    aria-describedby="helpId"
                    placeholder="mật khẩu "
                    onChange={handdleSubmit}
                  />
                </div>
                
                <div className="form-group">
                  <button className="btn btn-block btn-primary"> Thêm mới </button>
                </div>
                </form>
                
              </div>
        
            </div>
            
          </div>
    </div>
  )
}

export default Updateu