import { useState } from "react";
import axios from "axios";
import API_URL from "./global";
import { useNavigate, useParams } from "react-router-dom";

export default function EventForm({ url, eventId }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    entryName: "",
    mobileNumber: "",
    email: "",
    occupation: "",
    address: "",
    location: "",
    emailUpdates: false,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/events/${eventId}/entries`,
        formData
      );
      if (response.status === 201) {
        alert("Entry added successfully!");
        // Optionally, you can reset the form here
        setFormData({
          entryName: "",
          mobileNumber: "",
          email: "",
          occupation: "",
          address: "",
          location: "",
          emailUpdates: false,
        });
        console.log(url);
        // Call onSubmit function passed from parent component
        window.location.href = url;
      } else {
        alert("Failed to add entry.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="divallforme">
      <div className="form-container1">
        <h1>Book Your Slot</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="entryName"
              value={formData.entryName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group1">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group1">
            <label htmlFor="occupation">Occupation:</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group1">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group1">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group1">
            <input
              type="checkbox"
              id="emailUpdates"
              name="emailUpdates"
              checked={formData.emailUpdates}
              onChange={handleChange}
            />
            <span>Are you willing to receive mail updates on events?</span>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
