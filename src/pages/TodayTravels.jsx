import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

/* Uses original css/header.css + css/table.css - exact same markup as table.html */

export default function TodayTravels() {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const imageFile = document.getElementById('image').files[0];
    const time = document.getElementById('time').value;

    if (editIndex !== null && !imageFile) {
      // editing without changing image - use existing
      const updatedData = [...data];
      updatedData[editIndex] = { ...updatedData[editIndex], name, email, booking_time: time };
      setData(updatedData);
      setEditIndex(null);
      e.target.reset();
      return;
    }

    if (!name || !email || !imageFile || !time) {
      alert('Please fill all the fields!');
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const imageUrl = reader.result;
      const newData = { name, email, image: imageUrl, booking_time: time };

      if (editIndex !== null) {
        const updatedData = [...data];
        updatedData[editIndex] = newData;
        setData(updatedData);
        setEditIndex(null);
      } else {
        setData([...data, newData]);
      }
      e.target.reset();
    };
    reader.readAsDataURL(imageFile);
  };

  const editItem = (index) => {
    const item = data[index];
    document.getElementById('name').value = item.name;
    document.getElementById('email').value = item.email;
    document.getElementById('time').value = item.booking_time;
    setEditIndex(index);
  };

  const deleteItem = (index) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/css/header.css" />
      <link rel="stylesheet" href="/css/table.css" />

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

      {/* body content - same as table.html */}
      <div className="container">
        <h1>Today's Booking</h1>

        <form id="crudForm" encType="multipart/form-data" onSubmit={handleSubmit}>
          <input type="text" id="name" name="name" placeholder="Enter Name" required />
          <input type="email" id="email" name="email" placeholder="Enter Email" required />
          <input type="file" id="image" name="image" accept="image/*" />
          <input type="datetime-local" id="time" name="booking_time" required />
          <button type="submit">Save</button>
        </form>

        <table id="dataTable">
          <thead>
            <tr>
              <th>Num</th>
              <th>Name</th>
              <th>Email</th>
              <th>Image</th>
              <th>Booking Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ fontSize: '1rem', textAlign: 'center' }}>
                  <b>there is no resevison at the moment</b>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td><img className="user-image" src={item.image} alt="User" /></td>
                  <td>{item.booking_time}</td>
                  <td className="action-buttons">
                    <button className="edit" onClick={() => editItem(index)}>Edit</button>
                    <button className="delete" onClick={() => deleteItem(index)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
