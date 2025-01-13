import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Updatep() {
    const [product,setProduct]=useState([]);
    const [update,setUpdate]=useState({
        
        tensp:"",
        gia:"",
        hinh:"",
        mota:"",
        maloaisp:"",
        soluong:""
    });
    const params=useParams();
    const id=params.id
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:4000/updatep/'+id,update)
        
        
    }   
    function handleInput(e){
      setUpdate(Prve=>({
        ...Prve,[e.target.name]:[e.target.value]
      }))
    }
  return (
    
    <div>
        
       
        <div className="">
            
            <div className="card border-primary mb-3">
              <div className="card-header text-center">Sửa sản phẩm</div>
              <div className="card-body text-primary">
              
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="tensp"
                    id="tensp"
                    aria-describedby="helpId"
                    placeholder="tên sản phẩm"
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
                    placeholder="gia "
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
                    placeholder="hình  "
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
                    placeholder="mô tả  "
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="maloaisp"
                    id="hinh"
                    aria-describedby="helpId"
                    placeholder="mã loại sản phẩm  "
                    onChange={handleInput}
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

export default Updatep


