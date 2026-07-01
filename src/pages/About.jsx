import React, { useState } from 'react';
import '../styles/about.css';

export default function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }
    alert(`Thank you, ${formData.name}! Your message has been sent successfully.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="about-container">
      {/* Sidebar Navigation */}
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

      {/* Main Content Area */}
      <div className="about-main-content">
        {/* Mission Section */}
        <section id="mission" className="bubble-section">
          <div className="bubble-content">
            <h2>Our mission</h2>
            <p>
              Our mission is to enhance the efficiency of maritime navigation through the Suez Canal by
              providing real-time traffic management, accurate weather updates, and essential insights that
              empower stakeholders to make informed decisions. As one of the world’s most vital trade
              arteries, the Suez Canal plays a pivotal role in connecting nations, facilitating global
              commerce, and ensuring the smooth transit of goods and resources. We are dedicated to supporting
              this crucial infrastructure with cutting-edge solutions that streamline operations, reduce
              delays, and maintain safety standards for all users.
            </p>
          </div>
          <img src="/images/about/img1.webp" alt="Mission" />
        </section>

        {/* What We Offer Section */}
        <section id="offer" className="bubble-section">
          <div className="bubble-content">
            <h2>What We Offer</h2>
            <p>We provide the following services, tailored to meet the needs of maritime professionals and businesses:</p>
            <ul className="mlist">
              <li>
                <strong>Traffic Management:</strong> Stay informed with real-time updates on vessel
                movements and canal operations. Our advanced systems ensure that ships navigate efficiently,
                minimizing delays and congestion while optimizing routes for seamless transit.
              </li>
              <li>
                <strong>Weather Updates:</strong> Receive precise and reliable weather forecasts to plan
                your journey safely and effectively. From wind speeds to visibility and tide conditions, our
                updates equip crews with the knowledge they need to make informed decisions, enhancing
                safety and reliability.
              </li>
              <li>
                <strong>Comprehensive Insights:</strong> Access detailed statistics, operational
                announcements, and crucial updates about the Suez Canal. Our platform ensures transparency
                and provides all stakeholders with the data required to strategize and adapt in an
                ever-evolving maritime landscape.
              </li>
            </ul>
          </div>
          <img src="/images/about/img2.jpg" alt="What We Offer" />
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="bubble-section">
          <div className="bubble-content">
            <h2>Why Choose Us?</h2>
            <p>
              We’ve designed this platform to be user-friendly and reliable, delivering real-time information
              in a clear and accessible format. Our goal is to ensure that maritime professionals, shipping
              companies, and stakeholders can easily access the tools and data they need to navigate the Suez
              Canal efficiently. By focusing on intuitive design and cutting-edge technology, we strive to
              simplify complex processes, reduce uncertainties, and enhance the overall experience for users.
              This platform is built to adapt to your needs, offering features that save time, improve
              decision-making, and support the dynamic world of global trade.
            </p>
            <ul className="mlist">
              <li>
                <strong>Seamless Navigation:</strong> Intuitive interfaces and straightforward design to
                make accessing critical information effortless.
              </li>
              <li>
                <strong>Real-Time Updates:</strong> Accurate and timely notifications to help you stay ahead
                in fast-paced maritime operations.
              </li>
              <li>
                <strong>Reliable Support:</strong> A dependable platform built with user satisfaction and
                operational excellence in mind.
              </li>
            </ul>
          </div>
          <img src="/images/about/img3.jpg" alt="Why Choose Us" />
        </section>

        {/* Contact Us Form Section */}
        <section id="contact" className="contact-section">
          <h2>Contact Us</h2>
          <p style={{ marginBottom: '15px' }}>Have questions or feedback? Reach out through the form below:</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    </div>
  );
}
