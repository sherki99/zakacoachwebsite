import React, { useState } from 'react';
import './PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig'; // Ensure the path is correct
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';



const PersonalDetails = () => {
    const [formData, setFormData] = useState({
      email: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      medicalConditions: '',
    });
  
    const navigate = useNavigate();
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      // Check if email already exists in the database
      const q = query(collection(db, "userDetails"), where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);
    
      if (!querySnapshot.empty) {
        // Email already exists, display an error message
        alert("Email already exists. Please use a different email address.");
        return;
      }
    
      try {
        // Add a new document in the "personalDetails" collection
        const docRef = await addDoc(collection(db, "userDetails"), {
          email: formData.email,
          age: formData.age,
          gender: formData.gender,
          height: formData.height,
          weight: formData.weight,
          medicalConditions: formData.medicalConditions,
        });
    
        // Navigate to WorkoutDetails page with email as a parameter
        const documentId = docRef.id;
        navigate(`/WorkoutDetails/${documentId}`, { replace: true });
      } catch (error) {
        console.error("Error adding document:", error);
      }
    };


  return (
    <div className="personal-details-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Personal Details</h1>
        <p>Help us tailor a personalized fitness plan for you by providing your details.</p>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Height field */}
          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>

          {/* Weight field */}
          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          {/* Medical conditions field */}
          <div className="form-group">
            <label htmlFor="medicalConditions">Do you have any medical conditions we should be aware of?</label>
            <textarea
              id="medicalConditions"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Next</button>
        </form>
      </section>
    </div>
  );
};

export default PersonalDetails;
