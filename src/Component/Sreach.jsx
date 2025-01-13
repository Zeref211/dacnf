import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function Sreach() {
  const [values, setValues] = useState({
    tensp: ""
  })
  const params=useParams();
  const id=params.id;
  const handleSubmit=(e)=>{
    e.preventDefault();
     axios.post('http://localhost:4000/sreach/'+values.tensp)
  }
  function handleInput(e){
    setValues(prev=>({
      ...prev,
      [e.target.name]: [e.target.value]
    }))
    
  }
  return (
    <div>
      <div className="search">
        <div className="form-group">
          <form onSubmit={handleSubmit}>
                  <div className="btn-group">
                    <input
                      type="text"
                      className="form-control timkiem"
                      name="tensp"
                      id=""
                      aria-describedby="helpId"
                      placeholder="Nhập từ khoá  "
                      onChange={handleInput}
                      style={{ width: 610 }}
                    />
                    <button className="btn btn-info tim" > Tìm</button>
                  </div>
          </form>
        </div>
        </div>
                
    </div>
  )
}

export default Sreach