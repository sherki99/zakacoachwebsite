import React, { useState } from 'react';
import './NutrionDetails.css'; 
import { useNavigate, useParams } from 'react-router-dom';
import { db } from './firebaseConfig'; 
import { doc, updateDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next'; // Import i18n for translation

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
    const { t } = useTranslation(); // Hook for translation

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
                <h1>{t('nutritionDetails.title')}</h1>
                <p>{t('nutritionDetails.description')}</p>
            </section>

            {/* Form Section */}
            <section className="form-section">
                <form onSubmit={handleSubmit}>
                    {/* Physical Activity Level */}
                    <div className="form-group">
                        <label htmlFor="physical-activity">{t('nutritionDetails.physicalActivityLabel')}</label>
                        <select id="physical-activity" required onChange={handleChange}>
                            <option value="">{t('nutritionDetails.selectPhysicalActivity')}</option>
                            <option value="sedentary">{t('nutritionDetails.sedentary')}</option>
                            <option value="light">{t('nutritionDetails.lightActivity')}</option>
                            <option value="moderate">{t('nutritionDetails.moderateActivity')}</option>
                            <option value="high">{t('nutritionDetails.highActivity')}</option>
                        </select>
                    </div>

                    {/* Usual Daily Diet */}
                    <div className="form-group">
                        <label htmlFor="daily-diet">{t('nutritionDetails.dailyDietLabel')}</label>
                        <textarea id="daily-diet" rows="4" placeholder={t('nutritionDetails.dailyDietPlaceholder')} onChange={handleChange}></textarea>
                    </div>

                    {/* Meal Preparation Frequency */}
                    <div className="form-group">
                        <label htmlFor="meal-prep-frequency">{t('nutritionDetails.mealPrepFrequencyLabel')}</label>
                        <select id="meal-prep-frequency" required onChange={handleChange}>
                            <option value="">{t('nutritionDetails.selectMealPrepFrequency')}</option>
                            <option value="once">{t('nutritionDetails.onceADay')}</option>
                            <option value="twice">{t('nutritionDetails.twiceADay')}</option>
                            <option value="fewTimesWeek">{t('nutritionDetails.fewTimesAWeek')}</option>
                            <option value="onceWeek">{t('nutritionDetails.onceAWeek')}</option>
                        </select>
                    </div>

                    {/* Incorporate Supplements */}
                    <div className="form-group">
                        <label htmlFor="supplements">{t('nutritionDetails.incorporateSupplementsLabel')}</label>
                        <select id="supplements" required onChange={handleChange}>
                            <option value="">{t('nutritionDetails.selectSupplements')}</option>
                            <option value="yes">{t('nutritionDetails.yes')}</option>
                            <option value="no">{t('nutritionDetails.no')}</option>
                        </select>
                    </div>

                    {/* Meal Size Preference */}
                    <div className="form-group">
                        <label htmlFor="mealSizePreference">{t('nutritionDetails.mealSizePreferenceLabel')}</label>
                        <select id="mealSizePreference" required onChange={handleChange}>
                            <option value="">{t('nutritionDetails.selectMealSizePreference')}</option>
                            <option value="fewerLarger">{t('nutritionDetails.fewerLargerMeals')}</option>
                            <option value="moreFrequentSmaller">{t('nutritionDetails.moreFrequentSmallerMeals')}</option>
                            <option value="noPreference">{t('nutritionDetails.noPreference')}</option>
                        </select>
                    </div>

                    {/* Food Variety Preference */}
                    <div className="form-group">
                        <label htmlFor="foodVarietyPreference">{t('nutritionDetails.foodVarietyPreferenceLabel')}</label>
                        <select id="foodVarietyPreference" required onChange={handleChange}>
                            <option value="">{t('nutritionDetails.selectFoodVarietyPreference')}</option>
                            <option value="sameFoods">{t('nutritionDetails.sameFoods')}</option>
                            <option value="variety">{t('nutritionDetails.variety')}</option>
                        </select>
                    </div>

                    {/* Food Allergies or Restrictions */}
                    <div className="form-group">
                        <label htmlFor="foodAllergies">{t('nutritionDetails.foodAllergiesLabel')}</label>
                        <select id="foodAllergies" required onChange={handleChange}>
                            <option value="">{t('nutritionDetails.selectFoodAllergies')}</option>
                            <option value="yes">{t('nutritionDetails.yes')}</option>
                            <option value="no">{t('nutritionDetails.no')}</option>
                        </select>
                    </div>

                    {/* Conditional Text Area for Food Allergies Details */}
                    {showAllergyDetails && (
                        <div className="form-group">
                            <label htmlFor="foodAllergiesDetails">{t('nutritionDetails.foodAllergiesDetailsLabel')}</label>
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
                        <label htmlFor="additional-info">{t('nutritionDetails.additionalInfoLabel')}</label>
                        <textarea 
                            id="additional-info" 
                            rows="4" 
                            onChange={handleChange}
                            placeholder={t('nutritionDetails.additionalInfoPlaceholder')}
                        ></textarea>
                    </div>

                    {/* Final submission button */}
                    <button type="submit" className="next-btn">{t('nutritionDetails.submitButton')}</button>
                </form>
            </section>
        </div>
    );
};

export default NutritionDetails;
