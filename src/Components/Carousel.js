import React, { useState } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import StarIcon from '@material-ui/icons/Star';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import './Carousel.css';

const CARDS = 5; // Show only five cards
const MAX_VISIBILITY = 1; // Show only one card at a time

const Card = ({ title, content, imgsrc, stars, price }) => (
  <div className='card'>
    <div className='image-container'>
      <img src={imgsrc} alt={title} />
    </div>
    <div className='card-body'>
    <h2 className='card-title'>{title}</h2>
    <p className='card-content'>{content}</p>
    <div className='stars'>
      {[...Array(5)].map((_, i) => (
        i < stars ? <StarIcon key={i} style={{ color: 'tomato' }} /> : <StarBorderOutlinedIcon key={i} style={{ color: 'tomato' }} />
      ))}
    </div>
    <div className='price-tag'>
    <span>Price</span>
    <p className='price'>{`₹ ${price}`}</p></div>
    <button className='enroll-button'>Learn More</button>
    </div>
  </div>
);

const Carousel = () => {
  const [active, setActive] = useState(0); // Start from Card 1
  const count = CARDS;

  // Array of data for 5 cards
  const cardData = [
    {
      title: 'React',
      content: 'React Js long fact that a reader will be distracted by the readable.',
      imgsrc: 'https://rainbowit.net/html/histudy/assets/images/course/course-01.jpg',
      stars: 4,
      price: 5000,
    },
    {
      title: 'HTML',
      content: 'It is a long established fact that a reader will be distracted by the readable.',
      imgsrc: 'https://rainbowit.net/html/histudy/assets/images/course/classic-lms-01.jpg',
      stars: 3,
      price: 3500,
    },
    {
      title: 'CSS',
      content: 'A CSS course teaches how to style and design web pages Using CSS.',
      imgsrc: 'https://rainbowit.net/html/histudy/assets/images/course/course-03.jpg',
      stars: 4,
      price: 4000,
    },
    {
      title: 'Mongo',
      content: 'A MongoDB course offers comprehensive training on NoSQL database.',
      imgsrc: 'https://rainbowit.net/html/histudy/assets/images/course/course-02.jpg',
      stars: 4,
      price: 4500,
    },
    {
      title: 'Node Js',
      content: 'A Node.js course provides in-depth training on using Node.js, a popular runtime environment.',
      imgsrc: 'https://rainbowit.net/html/histudy/assets/images/course/course-05.jpg',
      stars: 5,
      price: 5500,
    },
  ];

  return (
    <div className='carousel'>
      {active > 0 && (
        <button className='nav left' onClick={() => setActive((i) => i - 1)}>
          <TiChevronLeftOutline />
        </button>
      )}
      {cardData.map((card, i) => (
        <div
          key={i}
          className='card-container'
          style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            'pointer-events': active === i ? 'auto' : 'none',
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? 0 : 1,
            display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          }}
        >
          <Card title={card.title} content={card.content} imgsrc={card.imgsrc} stars={card.stars} price={card.price} />
        </div>
      ))}
      {active < count - 1 && (
        <button className='nav right' onClick={() => setActive((i) => i + 1)}>
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

export default Carousel;
