import React, { useState, useEffect } from 'react';
import '../styles/table.css';

const DEFAULT_BOOKINGS = [
  {
    name: "Captain John Smith",
    email: "john.smith@maersk.com",
    image: "/images/gettyimages-1178343370-612x612.jpg",
    booking_time: "2026-07-02T08:00"
  },
  {
    name: "Officer Maria Rossi",
    email: "m.rossi@evergreen-shipping.com",
    image: "/images/gettyimages-1253824909-612x612.jpg",
    booking_time: "2026-07-02T13:45"
  }
];

export default function TodayTravels() {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('suez_bookings');
    return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS;
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('suez_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !time) {
      alert('Please fill out Name, Email, and Booking Time fields.');
      return;
    }

    const processSubmission = (imageUrl) => {
      const updatedData = {
        name: name.trim(),
        email: email.trim(),
        image: imageUrl,
        booking_time: time
      };

      if (editIndex !== null) {
        // Edit existing booking
        const newBookings = [...bookings];
        newBookings[editIndex] = updatedData;
        setBookings(newBookings);
        setEditIndex(null);
      } else {
        // Add new booking
        setBookings([...bookings, updatedData]);
      }

      // Reset form states
      setName('');
      setEmail('');
      setTime('');
      setImageFile(null);
      // Reset the file input element manually
      document.getElementById('image').value = '';
    };

    if (imageFile) {
      // Read selected image file as Base64 Data URL
      const reader = new FileReader();
      reader.onload = () => {
        processSubmission(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      if (editIndex !== null) {
        // Retain existing image when editing without selecting a new file
        processSubmission(bookings[editIndex].image);
      } else {
        alert('Please choose an image file for a new booking.');
      }
    }
  };

  const handleEditClick = (index) => {
    const item = bookings[index];
    setName(item.name);
    setEmail(item.email);
    setTime(item.booking_time);
    setEditIndex(index);
  };

  const handleDeleteClick = (index) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const newBookings = bookings.filter((_, idx) => idx !== index);
      setBookings(newBookings);
      // If we are currently editing the deleted item, reset editing state
      if (editIndex === index) {
        setEditIndex(null);
        setName('');
        setEmail('');
        setTime('');
        setImageFile(null);
        document.getElementById('image').value = '';
      }
    }
  };

  return (
    <div className="travels-page-container">
      <div className="travels-card-container">
        <h1>Today's Booking</h1>

        {/* Add/Edit Booking Form */}
        <form id="crudForm" onSubmit={handleFormSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            required={editIndex === null} // image is only strictly required on creation
          />
          <input
            type="datetime-local"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <button type="submit">
            {editIndex !== null ? 'Update Booking' : 'Save Booking'}
          </button>
          {editIndex !== null && (
            <button 
              type="button" 
              onClick={() => {
                setEditIndex(null);
                setName('');
                setEmail('');
                setTime('');
                setImageFile(null);
                document.getElementById('image').value = '';
              }}
              style={{ backgroundColor: '#aaa', marginTop: '-5px' }}
            >
              Cancel Edit
            </button>
          )}
        </form>

        {/* Booking display table */}
        <div className="table-responsive">
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
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ fontSize: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                    There are no bookings at the moment.
                  </td>
                </tr>
              ) : (
                bookings.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <img className="user-image" src={item.image} alt={item.name} />
                    </td>
                    <td>{new Date(item.booking_time).toLocaleString()}</td>
                    <td className="action-buttons">
                      <button className="edit" onClick={() => handleEditClick(index)}>Edit</button>
                      <button className="delete" onClick={() => handleDeleteClick(index)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
