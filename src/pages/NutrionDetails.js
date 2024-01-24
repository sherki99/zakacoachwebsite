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
        additionalInfo: '',
        mealSizePreference: '',
        foodVarietyPreference: '',
        foodAllergies: '' ,
        foodAllergiesDetails: ''
    });


    const [showAllergyDetails, setShowAllergyDetails] = useState(false); // New state


    const { documentId } = useParams();
    const navigate = useNavigate();

    const handleChange = (event) => {



        const { id, value } = event.target;

        
        // Check if the foodAllergies field is being updated to toggle the text area
        if (id === "foodAllergies") {
            setShowAllergyDetails(value === "yes");
        }


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
                            <option value="">Select One</option>
                            <option value="once">Once a day</option>
                            <option value="twice">Twice a day</option>
                            <option value="fewTimesWeek">A few times a week</option>
                            <option value="onceWeek">Once a week</option>
                        </select>
                    </div>


                    {/* Incorporate Supplements */}
                    <div className="form-group">
                        <label htmlFor="supplements">Incorporate Supplements in Diet</label>
                        <select id="supplements" required onChange={handleChange}>
                            <option value="">Select One</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>


                    
                 {/* Meal Size Preference */}
                  <div className="form-group">
                        <label htmlFor="mealSizePreference">Do you prefer eating fewer, larger meals or more frequent, smaller meals?</label>
                        <select id="mealSizePreference" required onChange={handleChange}>
                            <option value="">Select One</option>
                            <option value="fewerLarger">Fewer, larger meals</option>
                            <option value="moreFrequentSmaller">More frequent, smaller meals</option>
                            <option value="noPreference">No preference</option>
                        </select>
                    </div>

                    {/* Food Variety Preference */}
                    <div className="form-group">
                        <label htmlFor="foodVarietyPreference">Are you happy eating the same foods frequently or do you like a lot of variety?</label>
                        <select id="foodVarietyPreference" required onChange={handleChange}>
                            <option value="">Select One</option>
                            <option value="sameFoods">I am happy eating the same foods frequently</option>
                            <option value="variety">I like a lot of variety</option>
                        </select>
                    </div>

                    {/* Food Allergies or Restrictions */}
                    <div className="form-group">
                        <label htmlFor="foodAllergies">Do you have any allergies or food restrictions that we should be aware of?</label>
                        <select id="foodAllergies" required onChange={handleChange}>
                            <option value="">Select One</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    {/* Conditional Text Area for Food Allergies Details */}
                    {showAllergyDetails && (
                        <div className="form-group">
                            <label htmlFor="foodAllergiesDetails">Please specify your allergies or food restrictions:</label>
                            <textarea 
                                id="foodAllergiesDetails" 
                                rows="4" 
                                onChange={handleChange} 
                                value={nutritionData.foodAllergiesDetails}
                            ></textarea>
                        </div>
                    )}



                    {/* Additional Information */}
                    <div className="form-group">
                        <label htmlFor="additional-info">Any other information we should know regarding your nutrition?</label>
                        <textarea 
                            id="additional-info" 
                            rows="4" 
                            onChange={handleChange}
                            placeholder="Please include any additional, relevant information here."
                        ></textarea>
                    </div>


                    {/* Final submission button */}
                    <button type="submit" className="next-btn">Next</button>
                </form>
            </section>
        </div>
    );
};

export default NutritionDetails;
