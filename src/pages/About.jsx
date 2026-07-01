import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/* Uses original css/about.css + css/header.css - exact same markup as about.html */

export default function About() {
  return (
    <>
      <link rel="stylesheet" href="/css/about.css" />
      <link rel="stylesheet" href="/css/header.css" />

      {/* header */}
      <header className="header">
        <Link to="/" className="logo">
          <img src="/images/keep it2.png" alt="logo" width="150" className="logo-image" />
        </Link>

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

      {/* main content - exact same as about.html */}
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li><a href="#mission">Our Mission</a></li>
              <li><a href="#offer">What We Offer</a></li>
              <li><a href="#why-us">Why Choose Us?</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          <section id="mission" className="bubble-section">
            <div className="bubble-content">
              <h2>Our mission</h2>
              <p>
                Our mission is to enhance the efficiency of maritime navigation through the Suez Canal by
                providing real-time traffic management, accurate weather updates, and essential insights that
                empower stakeholders to make informed decisions. As one of the world's most vital trade
                arteries, the Suez Canal plays a pivotal role in connecting nations, facilitating global
                commerce, and ensuring the smooth transit of goods and resources. We are dedicated to supporting
                this crucial infrastructure with cutting-edge solutions that streamline operations, reduce
                delays, and maintain safety standards for all users.
              </p>
            </div>
            <img src="/images/about/img1.webp" alt="Mission Image" />
          </section>

          <section id="offer" className="bubble-section">
            <div className="bubble-content">
              <h2>What We Offer</h2>
              <p>We provide the following services, tailored to meet the needs of maritime professionals and businesses:</p>
              <ul className="mlist">
                <li><strong>Traffic Management:</strong> Stay informed with real-time updates on vessel movements and canal operations. Our advanced systems ensure that ships navigate efficiently, minimizing delays and congestion while optimizing routes for seamless transit.</li>
                <li><strong>Weather Updates:</strong> Receive precise and reliable weather forecasts to plan your journey safely and effectively. From wind speeds to visibility and tide conditions, our updates equip crews with the knowledge they need to make informed decisions, enhancing safety and reliability.</li>
                <li><strong>Comprehensive Insights:</strong> Access detailed statistics, operational announcements, and crucial updates about the Suez Canal. Our platform ensures transparency and provides all stakeholders with the data required to strategize and adapt in an ever-evolving maritime landscape.</li>
              </ul>
            </div>
            <img src="/images/about/img2.jpg" alt="What We Offer Image" />
          </section>

          <section id="why-us" className="bubble-section">
            <div className="bubble-content">
              <h2>Why Choose Us?</h2>
              <p>We've designed this platform to be user-friendly and reliable, delivering real-time information in a clear and accessible format. Our goal is to ensure that maritime professionals, shipping companies, and stakeholders can easily access the tools and data they need to navigate the Suez Canal efficiently. By focusing on intuitive design and cutting-edge technology, we strive to simplify complex processes, reduce uncertainties, and enhance the overall experience for users. This platform is built to adapt to your needs, offering features that save time, improve decision-making, and support the dynamic world of global trade.</p>
              <ul className="mlist">
                <li><strong>Seamless Navigation:</strong> Intuitive interfaces and straightforward design to make accessing critical information effortless.</li>
                <li><strong>Real-Time Updates:</strong> Accurate and timely notifications to help you stay ahead in fast-paced maritime operations.</li>
                <li><strong>Reliable Support:</strong> A dependable platform built with user satisfaction and operational excellence in mind.</li>
              </ul>
            </div>
            <img src="/images/about/img3.jpg" alt="Why Choose Us Image" />
          </section>

          {/* Contact Us Section */}
          <section id="contact" className="contact-section">
            <h2>Contact Us</h2>
            <p style={{ marginBottom: '15px' }}>Have questions or feedback? Reach out through the form below:</p>
            <form action="#" method="post">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Your Email" required />

              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>

              <button type="submit">Submit</button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
