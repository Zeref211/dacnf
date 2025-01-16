import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import axios from 'axios';
import ProductTable from './ProductTable';

function Product() {
  const [product, setProduct] = useState([])
  useEffect(() => {
    axios.get('http://localhost:4000/product')
      .then(res => setProduct(res.data))
      .catch(err => console.log("sai r"))

  }, [])

  return (

    <div>
      <Header />

      <div className="container">
        <div className="row">


          {product.map((product, i) => {
            return (
              <div className="col-4">
                <div className="sp mt-4 ">
                  <ProductTable id={product.masp} tensp={product.tensp} gia={product.gia} hinh={product.hinh} />
                  
                  
                </div>
              </div>
            )

          })}
        </div>


      </div>

    </div>
  )
}

export default Product