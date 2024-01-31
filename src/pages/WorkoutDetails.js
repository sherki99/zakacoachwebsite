import React, { useState, useEffect } from 'react';
import './WorkoutDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next'; // Import i18n for translation

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
  const { t } = useTranslation(); // Hook for translation

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
        <h1>{t('workoutDetails.title')}</h1>
        <p>{t('workoutDetails.description')}</p>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <form onSubmit={handleSubmit}>
          {/* Fitness Objective */}
          <div className="form-group">
            <label htmlFor="fitnessObjective">{t('workoutDetails.fitnessObjectiveLabel')}</label>
            <select
              id="fitnessObjective"
              name="fitnessObjective"
              value={formData.fitnessObjective}
              onChange={handleChange}
              required
            >
              <option value="muscle_gain">{t('workoutDetails.fitnessObjectiveOptions.muscleGain')}</option>
            </select>
          </div>

          {/* Specific Muscle Groups */}
          <div className="form-group">
            <label htmlFor="specificMuscleGroups">{t('workoutDetails.specificMuscleGroupsLabel')}</label>
            <input
              type="text"
              id="specificMuscleGroups"
              name="specificMuscleGroups"
              value={formData.specificMuscleGroups}
              onChange={handleChange}
              placeholder={t('workoutDetails.specificMuscleGroupsPlaceholder')}
            />
          </div>

          {/* Significant Injuries */}
          <div className="form-group">
            <label htmlFor="significantInjuries">{t('workoutDetails.significantInjuriesLabel')}</label>
            <select
              id="significantInjuries"
              name="significantInjuries"
              value={formData.significantInjuries}
              onChange={handleChange}
              required
            >
              <option value="">{t('workoutDetails.significantInjuriesOptions.selectOne')}</option>
              <option value="yes">{t('workoutDetails.significantInjuriesOptions.yes')}</option>
              <option value="no">{t('workoutDetails.significantInjuriesOptions.no')}</option>
            </select>
          </div>

          {/* Weight Training Experience */}
          <div className="form-group">
            <label htmlFor="weightTrainingExperience">{t('workoutDetails.weightTrainingExperienceLabel')}</label>
            <select
              id="weightTrainingExperience"
              name="weightTrainingExperience"
              value={formData.weightTrainingExperience}
              onChange={handleChange}
              required
            >
              <option value="">{t('workoutDetails.weightTrainingExperienceOptions.selectOne')}</option>
              <option value="beginner">{t('workoutDetails.weightTrainingExperienceOptions.beginner')}</option>
              <option value="intermediate">{t('workoutDetails.weightTrainingExperienceOptions.intermediate')}</option>
              <option value="advanced">{t('workoutDetails.weightTrainingExperienceOptions.advanced')}</option>
            </select>
          </div>

          {/* Biggest Obstacle */}
          <div className="form-group">
            <label htmlFor="biggestObstacle">{t('workoutDetails.biggestObstacleLabel')}</label>
            <textarea
              type="text"
              id="biggestObstacle"
              name="biggestObstacle"
              value={formData.biggestObstacle}
              onChange={handleChange}
              placeholder={t('workoutDetails.biggestObstaclePlaceholder')}
            ></textarea>
          </div>

          {/* Workout Frequency */}
          <div className="form-group">
            <label htmlFor="workoutFrequency">{t('workoutDetails.workoutFrequencyLabel')}</label>
            <select
              id="workoutFrequency"
              name="workoutFrequency"
              value={formData.workoutFrequency}
              onChange={handleChange}
              required
            >
              <option value="">{t('workoutDetails.workoutFrequencyOptions.selectOne')}</option>
              <option value="2-3">{t('workoutDetails.workoutFrequencyOptions.2-3')}</option>
              <option value="4-5">{t('workoutDetails.workoutFrequencyOptions.4-5')}</option>
              <option value="6-7">{t('workoutDetails.workoutFrequencyOptions.6-7')}</option>
            </select>
          </div>

          {/* Workout Duration */}
          <div className="form-group">
            <label htmlFor="workoutDuration">{t('workoutDetails.workoutDurationLabel')}</label>
            <select
              id="workoutDuration"
              name="workoutDuration"
              value={formData.workoutDuration}
              onChange={handleChange}
              required
            >
              <option value="">{t('workoutDetails.workoutDurationOptions.selectOne')}</option>
              <option value="<30">{t('workoutDetails.workoutDurationOptions.lessThan30')}</option>
              <option value="30-60">{t('workoutDetails.workoutDurationOptions.30-60')}</option>
              <option value="60-90">{t('workoutDetails.workoutDurationOptions.60-90')}</option>
            </select>
          </div>

          {/* Importance of Flexibility */}
          <div className="form-group">
            <label htmlFor="importanceOfFlexibility">{t('workoutDetails.importanceOfFlexibilityLabel')}</label>
            <select
              id="importanceOfFlexibility"
              name="importanceOfFlexibility"
              value={formData.importanceOfFlexibility}
              onChange={handleChange}
              required
            >
              <option value="">{t('workoutDetails.importanceOfFlexibilityOptions.selectOne')}</option>
              <option value="notImportant">{t('workoutDetails.importanceOfFlexibilityOptions.notImportant')}</option>
              <option value="somewhatImportant">{t('workoutDetails.importanceOfFlexibilityOptions.somewhatImportant')}</option>
              <option value="important">{t('workoutDetails.importanceOfFlexibilityOptions.important')}</option>
              <option value="veryImportant">{t('workoutDetails.importanceOfFlexibilityOptions.veryImportant')}</option>
            </select>
          </div>

          {/* Success Vision */}
          <div className="form-group">
            <label htmlFor="successVision">{t('workoutDetails.successVisionLabel')}</label>
            <textarea
              id="successVision"
              name="successVision"
              value={formData.successVision}
              onChange={handleChange}
              placeholder={t('workoutDetails.successVisionPlaceholder')}
            ></textarea>
          </div>

          {/* Final submission button */}
          <button type="submit" className="next-btn">{t('workoutDetails.submitButton')}</button>
        </form>
      </section>

      {/* Footer Section */}
      {/* ... (footer section code) */}
    </div>
  );
};

export default WorkoutDetails;
