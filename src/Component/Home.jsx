import React from 'react'
import Header from './Header'

function Home() {
  return (
    <div>
    <Header/>
         <div className="banner">
  {/* carousel */}
  <div id="demo" className="carousel slide" data-ride="carousel">
    {/* Indicators */}
    <ul className="carousel-indicators">
      <li data-target="#demo" data-slide-to={0} className="active" />
      <li data-target="#demo" data-slide-to={1} />
      <li data-target="#demo" data-slide-to={2} />
    </ul>
    {/* The slideshow */}
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          src="https://img.mwc.com.vn/giay-thoi-trang?w=1920&h=0&FileInput=/Resources/Silde/2024/06/12/SUMMER%20COLLECTION%20(PC).jpg"
          alt="Los Angeles"
        />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.mwc.com.vn/giay-thoi-trang?w=1920&h=0&FileInput=/Resources/Silde/2024/08/07/a1667961-8c7c-492b-aab1-53df18933aff.jpg"
          alt="Chicago"
        />
      </div>
      <div className="carousel-item">
        <img
          src="https://file.hstatic.net/1000003969/file/banner-wcdxceb-1920x870_b94d0e863df140f49995e6f8ec826de1.jpg"
          alt="New York"
        />
      </div>
    </div>
    {/* Left and right controls */}
    {/* <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a> */}
  </div>
</div>
    </div>
  )
}

export default Home