import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/* 
  Home page uses css/index.css + css/footer.css
  Same markup as original index.html exactly
*/

export default function Home() {
  return (
    <>
      {/* inject original index.css and footer.css */}
      <link rel="stylesheet" href="/css/index.css" />
      <link rel="stylesheet" href="/css/footer.css" />

      <header className="header">
        <a href="/" className="logo">
          <img src="/images/keep it2.png" alt="logo" width="150" className="logo-image" />
        </a>

        <nav className="navbar">
          <NavLink to="/" end style={{ '--i': 1 }} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/about" style={{ '--i': 2 }} className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
          <NavLink to="/travels" style={{ '--i': 3 }} className={({ isActive }) => isActive ? 'active' : ''}>Today Travels</NavLink>
          <NavLink to="/weather" style={{ '--i': 4 }} className={({ isActive }) => isActive ? 'active' : ''}>Weather</NavLink>
          <Link to="/login">
            <button className="singn_in_btn">sign in</button>
          </Link>
        </nav>

        <div className="soial-media">
          <a href="https://twitter.com/SuezAuthorityEG" target="_blank" rel="noreferrer" style={{ '--i': 1 }}><i className="bx bxl-twitter"></i></a>
          <a href="https://www.facebook.com/SuezCanalAuthorityEG/" target="_blank" rel="noreferrer" style={{ '--i': 2 }}><i className="bx bxl-facebook-circle"></i></a>
          <a href="https://www.instagram.com/suezcanalauthority/" target="_blank" rel="noreferrer" style={{ '--i': 3 }}><i className="bx bxl-instagram-alt"></i></a>
        </div>
      </header>

      <main>
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
              <img src="/images/Cruise Ship Transparent PNG Clip Art Image-Photoroom.png" alt="" />
            </div>
          </div>
          <div className="rhombus2"></div>
        </section>

        {/* TOP CATEGORIES */}
        <div className="categoryContainer">
          <div className="category">
            <div className="categoryHeader">
              <h1>Top Categories</h1>
            </div>

            <div className="categoryCards">
              {/* CARD 1 */}
              <div className="card">
                <Link to="/about">
                  <div className="genre">About</div>
                  <div className="cardImg">
                    <img src="/images/map.jpg" width="232" height="240" alt="About" />
                  </div>
                </Link>
              </div>

              {/* CARD 2 */}
              <div className="card">
                <Link to="/login">
                  <div className="genre">Login</div>
                  <div className="cardImg">
                    <img src="/images/gettyimages-1233845335-612x612.jpg" alt="" width="232" height="240" />
                  </div>
                </Link>
              </div>

              {/* CARD 3 */}
              <div className="card">
                <Link to="/travels">
                  <div className="genre">Travels</div>
                  <div className="cardImg">
                    <img src="/images/gettyimages-1342143068-612x612.jpg" alt="" width="232" height="240" />
                  </div>
                </Link>
              </div>

              {/* CARD 4 */}
              <div className="card">
                <Link to="/">
                  <div className="genre">Home</div>
                  <div className="cardImg">
                    <img src="/images/gettyimages-1266961933-612x612.jpg" alt="" width="232" height="240" />
                  </div>
                </Link>
              </div>

              {/* CARD 5 */}
              <div className="card">
                <Link to="/weather">
                  <div className="genre">Weather</div>
                  <div className="cardImg">
                    <img src="/images/gettyimages-487880187-612x612.jpg" alt="" width="232" height="240" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <ul className="social-icon">
            <li className="social-icon__item">
              <a className="social-icon__link" href="https://www.facebook.com/SuezCanalAuthorityEG/" target="_blank" rel="noreferrer">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li className="social-icon__item">
              <a className="social-icon__link" href="https://twitter.com/SuezAuthorityEG" target="_blank" rel="noreferrer">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li className="social-icon__item">
              <a className="social-icon__link" href="https://www.instagram.com/suezcanalauthority/" target="_blank" rel="noreferrer">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
          </ul>
          <ul className="menu">
            <li className="menu__item"><Link className="menu__link" to="/">Home</Link></li>
            <li className="menu__item"><Link className="menu__link" to="/about">About</Link></li>
            <li className="menu__item"><Link className="menu__link" to="/travels">Travels</Link></li>
            <li className="menu__item"><Link className="menu__link" to="/weather">Weather</Link></li>
            <li className="menu__item"><Link className="menu__link" to="/login">Login</Link></li>
          </ul>
          <p>&copy;2024 MTIS | All Rights Reserved</p>
        </footer>
      </main>
    </>
  );
}
