import React, { useState, useEffect } from 'react';
import './WorkoutDetails.css'; // Ensure the path is correct
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig'; // Ensure the path is correct
import { doc, setDoc } from 'firebase/firestore';

const WorkoutDetails = () => {
  const [formData, setFormData] = useState({
    fitnessObjective: 'muscle_gain',
    fitnessTargets: '',
    journeyDuration: '',
    currentRoutine: '',
    commitmentLevel: 'high',
    motivation: '',
    significantInjuries: '',
    weightTrainingExperience: '',
    biggestObstacle: '',
    workoutFrequency: '',
    workoutDuration: '',
    overallActivityLevel: '',
    importanceOfFlexibility: '',
    successVision: '',
    specificMuscleGroups: '', 
    previousWorkoutRegimens: '', 
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
{/* Form Section */}
<section className="form-section">
  <form onSubmit={handleSubmit}>
    {/* Existing and new form fields */}
    {/* Insert your existing form fields here */}

    {/* Significant injuries */}
    <div className="form-group">



    <div className="form-group">
            <label htmlFor="fitnessObjective">What is your primary fitness objective?</label>
            <select
              id="fitnessObjective"
              name="fitnessObjective"
              value={formData.fitnessObjective}
              onChange={handleChange}
              required
            >
              <option value="muscle_gain">Muscle Gain</option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="specificMuscleGroups">Are there specific muscle groups you want to focus on?</label>
            <input
              type="text"
              id="specificMuscleGroups"
              name="specificMuscleGroups"
              value={formData.specificMuscleGroups}
              onChange={handleChange}
              placeholder="e.g., Arms, Legs, Back..."
            />
          </div>

      <label htmlFor="significantInjuries">Do you have any significant injuries?</label>
      <select
        id="significantInjuries"
        name="significantInjuries"
        value={formData.significantInjuries}
        onChange={handleChange}
        required
      >
        <option value="">-- Select One --</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>

    {/* Weight training experience */}
    <div className="form-group">
      <label htmlFor="weightTrainingExperience">How would you classify your weight training experience?</label>
      <select
        id="weightTrainingExperience"
        name="weightTrainingExperience"
        value={formData.weightTrainingExperience}
        onChange={handleChange}
        required
      >
        <option value="">-- Select One --</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>

      {/* Biggest obstacle */}
      <div className="form-group">
        <label htmlFor="biggestObstacle">What is the #1 single biggest obstacle holding you back right now?</label>
        <textarea
          type="text"
          id="biggestObstacle"
          name="biggestObstacle"
          value={formData.biggestObstacle}
          onChange={handleChange}
          placeholder="Describe your biggest obstacle..."
        ></textarea>
      </div>


    {/* Workout frequency */}
    <div className="form-group">
      <label htmlFor="workoutFrequency">How frequently would you be able to work out?</label>
      <select
        id="workoutFrequency"
        name="workoutFrequency"
        value={formData.workoutFrequency}
        onChange={handleChange}
        required
      >
        <option value="">-- Select One --</option>
        <option value="2-3">2-3 days a week</option>
        <option value="4-5">4-5 days a week</option>
        <option value="6-7">6-7 days a week</option>
      </select>
    </div>

    {/* Workout duration */}
    <div className="form-group">
      <label htmlFor="workoutDuration">How much time do you have for each workout?</label>
      <select
        id="workoutDuration"
        name="workoutDuration"
        value={formData.workoutDuration}
        onChange={handleChange}
        required
      >
        <option value="">-- Select One --</option>
        <option value="<30">Less than 30 minutes</option>
        <option value="30-60">30-60 minutes</option>
        <option value="60-90">60-90 minutes</option>
      </select>
    </div>



    {/* Importance of improving flexibility and mobility */}
    <div className="form-group">
      <label htmlFor="importanceOfFlexibility">How important is it for you to improve your flexibility and mobility?</label>
      <select
        id="importanceOfFlexibility"
        name="importanceOfFlexibility"
        value={formData.importanceOfFlexibility}
        onChange={handleChange}
        required
      >
        <option value="">-- Select One --</option>
        <option value="notImportant">Not important</option>
        <option value="somewhatImportant">Somewhat important</option>
        <option value="important">Important</option>
        <option value="veryImportant">Very important</option>
      </select>
    </div>

    {/* Success vision */}
    <div className="form-group">
      <label htmlFor="successVision">What would success look like for you 3 months from now?</label>
      <textarea
        id="successVision"
        name="successVision"
        value={formData.successVision}
        onChange={handleChange}
        placeholder="Describe your vision of success..."
      ></textarea>
    </div>



    {/* Final submission button */}
    <button type="submit" className="next-btn">Next</button>
  </form>
</section>


      {/* Footer Section */}
      {/* ... (footer section code) */}
    </div>
  );
};

export default WorkoutDetails;
