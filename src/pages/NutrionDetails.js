import React, { useState } from 'react';
import './NutrionDetails.css'; 
import { useNavigate, useParams } from 'react-router-dom';
import { db } from './firebaseConfig'; 
import { doc, updateDoc } from 'firebase/firestore';

const NutritionDetails = () => {
    const [nutritionData, setNutritionData] = useState({
        physicalActivity: '',
        dailyDiet: '',
        mealPrepFrequency: '',
        supplements: '',
        additionalInfo: ''
    });

    const { documentId } = useParams();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setNutritionData({ ...nutritionData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Update the document in the "userDetails" collection with the nutrition data
            await updateDoc(doc(db, 'userDetails', documentId), {
                ...nutritionData
            });

            
        navigate(`/BodyMeasurementUpload/${documentId}`, { replace: true });


        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    return (
        <div className="nutrition-details-page">
            {/* Hero Section */}
            <section className="hero-section">
                <h1>Nutrition Details</h1>
                <p>Let us know about your nutritional habits to help us tailor a personalized diet plan for you.</p>
            </section>

            {/* Form Section */}
            <section className="form-section">
                <form onSubmit={handleSubmit}>
                    {/* Physical Activity Level */}
                    <div className="form-group">
                        <label htmlFor="physical-activity">Physical Activity Level</label>
                        <select id="physical-activity" required onChange={handleChange}>
                            <option value="">Select your current level of physical activity</option>
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Light Activity</option>
                            <option value="moderate">Moderate Activity</option>
                            <option value="high">High Activity</option>
                        </select>
                    </div>

                    {/* Usual Daily Diet */}
                    <div className="form-group">
                        <label htmlFor="daily-diet">Usual Daily Diet</label>
                        <textarea id="daily-diet" rows="4" placeholder="Describe your typical daily diet." onChange={handleChange}></textarea>
                    </div>

                    {/* Meal Preparation Frequency */}
                    <div className="form-group">
                        <label htmlFor="meal-prep-frequency">Meal Preparation Frequency</label>
                        <select id="meal-prep-frequency" required onChange={handleChange}>
                            <option value="">-- Select One --</option>
                            <option value="once">Once a day</option>
                            {/* Add more options if needed */}
                        </select>
                    </div>

                    {/* Incorporate Supplements */}
                    <div className="form-group">
                        <label htmlFor="supplements">Incorporate Supplements in Diet</label>
                        <select id="supplements" required onChange={handleChange}>
                            <option value="">-- Select One --</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    {/* Additional Information */}
                    <div className="form-group">
                        <label htmlFor="additional-info">Any other information we should know regarding your nutrition?</label>
                        <textarea id="additional-info" rows="4" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit" className="next-btn">Next</button>
                </form>
            </section>
        </div>
    );
};

export default NutritionDetails;
