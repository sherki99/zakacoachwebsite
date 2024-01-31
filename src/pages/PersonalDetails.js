import React, { useState } from 'react';
import './PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const PersonalDetails = () => {
    const { t } = useTranslation(); // Initialize translation hook
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
            alert(t('emailExistsErrorMessage'));
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
                <h1>{t('personalDetails.title')}</h1>
                <p>{t('personalDetails.instructions')}</p>
            </section>

            {/* Form Section */}
            <section className="form-section">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">{t('personalDetails.emailLabel')}</label>
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
                        <label htmlFor="age">{t('personalDetails.ageLabel')}</label>
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
                        <label htmlFor="gender">{t('personalDetails.genderLabel')}</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">{t('personalDetails.selectGender')}</option>
                            <option value="male">{t('personalDetails.male')}</option>
                            <option value="female">{t('personalDetails.female')}</option>
                            <option value="other">{t('personalDetails.other')}</option>
                        </select>
                    </div>

                    {/* Height field */}
                    <div className="form-group">
                        <label htmlFor="height">{t('personalDetails.heightLabel')}</label>
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
                        <label htmlFor="weight">{t('personalDetails.weightLabel')}</label>
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
                        <label htmlFor="medicalConditions">{t('personalDetails.medicalConditionsLabel')}</label>
                        <textarea
                            id="medicalConditions"
                            name="medicalConditions"
                            value={formData.medicalConditions}
                            onChange={handleChange}
                            rows="4"
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">{t('personalDetails.submitButton')}</button>
                </form>
            </section>
        </div>
    );
};

export default PersonalDetails;
