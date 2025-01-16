import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Img1 from '../Assets/0eb4c83d.jpg'

function ProductDetail() {
  const [name, setName] = useState('');
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [cart, setCart] = useState([]);
  const [size, setSize] = useState([]);
  const [selectSize, setSelectSize] = useState('');
  const [makh, setMakh] = useState('');
  const [flag, setFlag] = useState(0);
  const [values, setValues] = useState({
    makh: makh,
    masp: "",
    tensp: "",
    soluong: 1,
    gia: "",
    
  })
  const [product, setProduct] = useState([]);
  const parmas = useParams();
  const id = parmas.id
  useEffect(() => {
    const checktoken = async () => {
      try {
        const res = await axios.get('http://localhost:4000/auth')
        if (res.data.Status === "Success") {
          setAuth(true)
          setName(res.data.name)
          setMakh(res.data.makh)
        } else {
          setAuth(false)
          setMessage(res.data.Error)
        }
      } catch (error) {
        console.log(error);
      }
    }
    checktoken()
    axios.get('http://localhost:4000/product/' + id)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
    axios.get(`http://localhost:4000/sizegiay/${id}`)
      .then(res => setSize(res.data))
      .catch(err => console.log(err))
    axios.get('http://localhost:4000/getcart')
      .then(res => setCart(res.data))
  }, [])
  useEffect(() => {
    console.log(cart);
    for (let index = 0; index < cart.length; index++) {
      if (cart[index].masp == id) {
        setFlag(1)
        return
      }
    }
  }, [cart])
  const handleSelectSize = (size) => {
    setSelectSize(size);
    console.log(selectSize);

  };

  return (
    <div>
      <>
        <Header />
        {product.map((product, i) => {
          return (
            <div className="chitiet mt-4 ml-5 ">
              <div className="container">
                <div className="row">
                  <div className="col-3 w-30px">
                    <a href="" className="imgp">
                      <img src={product.hinh} alt="" style={{ width: '200px', height: '200px' }} />
                    </a>
                  </div>

                  <div className="col-6 thongtin  ">
                    <h4>{product.tensp}</h4>
                    <h5>Giá:{product.gia}₫</h5>
                    <div className="size mt-5">
                      <h6>Select size</h6>

                      <div className="row">
                        <div className="col-7">
                          {size.map((size, i) => {
                            return (
                              <button
                                key={i}
                                type="button"
                                className="btn btn-outline-dark mt-2 mr-2"
                                onClick={() => handleSelectSize(size.masize)}
                              >
                                {size.sosize}
                                <span></span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="col-7 ">
  <button href="" className="Add " onClick={() => {

    if (flag === 0) {
      
      const today = new Date();
      const ngaylaphoadon = today.toISOString().split('T')[0]; 
      
      axios.post('http://localhost:4000/addCart', {
        makh: makh,
        masp: product.masp,
        tensp: product.tensp,
        gia: product.gia,
        soluong: 1,
        size: selectSize,
        ngaylaphoadon: ngaylaphoadon, 
        mahd: null 
      }).then((res) => {
        console.log(res);
        window.location.reload()
       
      })
    } else {
      alert('đã có sp trong giỏ hàng');
    }

  }}>
    Add to cart
  </button>
</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {/* end chi tiet sp */}
        <div className="splienquan">
          <div className="container"></div>
        </div>
        {/* end sp lien quan */}
      </>
    </div>
  )
}

export default ProductDetail