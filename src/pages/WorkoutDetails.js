import React, { useState, useEffect } from 'react';
import './WorkoutDetails.css'; // Ensure the path is correct
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig'; // Ensure the path is correct
import { doc, setDoc } from 'firebase/firestore';

const WorkoutDetails = () => {
  const [formData, setFormData] = useState({
    fitnessObjective: '',
    fitnessTargets: '',
    journeyDuration: '',
    currentRoutine: '',
    commitmentLevel: 'high',
    motivation: '',
  });

  const { documentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // You might want to fetch existing data for this documentId and set it to formData here
  }, [documentId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update the document in the "userDetails" collection with the documentId
      await setDoc(doc(db, 'userDetails', documentId), {
        ...formData,
      }, { merge: true });

      // Redirect to the next page
      navigate(`/NutrionDetails/${documentId}`, { replace: true });


    } catch (error) {
      console.error("Error setting document:", error);
    }
  };



  return (
    <div className="workout-details-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Workout Details</h1>
        <p>Tell us about your fitness journey to help us create a personalized workout plan for you.</p>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <form onSubmit={handleSubmit}>
          {/* Primary fitness objective */}
          <div className="form-group">
            <label htmlFor="fitnessObjective">What is your primary fitness objective?</label>
            <select
              id="fitnessObjective"
              name="fitnessObjective"
              value={formData.fitnessObjective}
              onChange={handleChange}
              required
            >
              <option value="">-- Select One --</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="improve_fitness">Improve Overall Fitness</option>
              <option value="increase_strength">Increase Strength</option>
            </select>
          </div>

          {/* Specific fitness targets */}
          <div className="form-group">
            <label htmlFor="fitnessTargets">Have you set any specific targets for your fitness goal?</label>
            <input
              type="text"
              id="fitnessTargets"
              name="fitnessTargets"
              value={formData.fitnessTargets}
              onChange={handleChange}
            />
          </div>

          {/* Fitness journey duration */}
          <div className="form-group">
            <label htmlFor="journeyDuration">How long have you been actively engaged in your fitness journey?</label>
            <input
              type="text"
              id="journeyDuration"
              name="journeyDuration"
              value={formData.journeyDuration}
              onChange={handleChange}
            />
          </div>

          {/* Current workout routine */}
          <div className="form-group">
            <label htmlFor="currentRoutine">Are you currently following any workout routine or program?</label>
            <input
              type="text"
              id="currentRoutine"
              name="currentRoutine"
              value={formData.currentRoutine}
              onChange={handleChange}
            />
          </div>

          {/* Commitment level */}
          <div className="form-group">
            <label htmlFor="commitmentLevel">What is your current level of commitment to your fitness goals?</label>
            <select
              id="commitmentLevel"
              name="commitmentLevel"
              value={formData.commitmentLevel}
              onChange={handleChange}
              required
            >
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Motivation */}
          <div className="form-group">
            <label htmlFor="motivation">What motivates you the most to pursue your fitness goal?</label>
            <input
              type="text"
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="next-btn">Next</button>
        </form>
      </section>

      {/* Footer Section */}
      {/* ... (footer section code) */}
    </div>
  );
};

export default WorkoutDetails;
