import React from 'react';
import './Container.css';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import Carousel from './Carousel';

function Container() {
  return (
    <div className="grid-box">
      <div className='item'>
        <h1 className='home-title'>Build The Skills To Drive Your Career.</h1>
<p className='home-para'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat.</p>

      <button className='item-btn'>View Course<ArrowForwardIosOutlinedIcon /></button>
      </div>
      <div className='item'><img src='https://rainbowit.net/html/histudy/assets/images/banner/banner-01.png'  alt='home-img'/></div>
      <div className="item">
        {/* Insert the Carousel component here */}
        <Carousel />
      </div>
    </div>
  );
}

export default Container;
