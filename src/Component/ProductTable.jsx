import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import Img1 from '../Assets/0eb4c83d.jpg'
function ProductTable(props) {
  return (
    <div className="">
      
         
        <div className="card">
          <Link to={`/ProductDetail/${props.id}`}>
          <img
            className="card-img-top img-sp"
            src="https://dummyimage.com/350x400/aba9ab/000000"
            alt="Card image"
          />
          </Link>
          <div className="card-body">
            <h4 className="card-title tille text-center">
              {props.tensp}
            </h4>
            <p className="card-text price text-center">{props.gia}</p>
            
          </div>
          
        </div>
      
      </div>
    
    
  )
}

export default ProductTable