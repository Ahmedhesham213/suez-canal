import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

export default function Home() {
  const categories = [
    { name: 'About', path: '/about', img: '/images/map.jpg' },
    { name: 'Login', path: '/login', img: '/images/gettyimages-1233845335-612x612.jpg' },
    { name: 'Travels', path: '/travels', img: '/images/gettyimages-1342143068-612x612.jpg' },
    { name: 'Home', path: '/', img: '/images/gettyimages-1266961933-612x612.jpg' },
    { name: 'Weather', path: '/weather', img: '/images/gettyimages-487880187-612x612.jpg' },
  ];

  return (
    <div>
      <section className="home">
        <div className="home-content">
          <h1>Suez Canal</h1>
          <h3>about us.</h3>
          <p>
            The Suez Canal is a man-made waterway connecting the Mediterranean Sea to the Indian Ocean via the Red Sea.
            It enables a more direct route for shipping between Europe and Asia,
            effectively allowing for passage from the North Atlantic to the Indian Ocean without having to circumnavigate
            the African continent.
            The waterway is vital for international trade and, as a result, has been at the center of conflict since it
            opened in 1869.
          </p>
          <Link to="/about" className="btn">More!</Link>
        </div>

        <div className="home-img">
          <div className="rhombus">
            <img src="/images/Cruise Ship Transparent PNG Clip Art Image-Photoroom.png" alt="Cruise Ship" />
          </div>
        </div>
        <div className="rhombus2"></div>
      </section>

      {/* TOP CATEGORIES */}
      <div className="categoryContainer">
        <div className="category">
          <div className="categoryHeader" style={{ '--i': 1 }}>
            <h1>Top Categories</h1>
          </div>

          <div className="categoryCards">
            {categories.map((cat, idx) => (
              <div className="card" key={idx}>
                <Link to={cat.path}>
                  <div className="genre">{cat.name}</div>
                  <div className="cardImg">
                    <img src={cat.img} alt={cat.name} width="232" height="240" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
