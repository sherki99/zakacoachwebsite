import React, { useState } from 'react';
import './BodyMeasurementUpload.css';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig'; // Ensure the path is correct
import { doc, updateDoc } from 'firebase/firestore';
import { storage } from './firebaseConfig'; // Update the path as necessary
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useTranslation } from 'react-i18next'; // Import i18n for translation

const BodyMeasurementUpload = () => {
    const [frontSideImage, setFrontSideImage] = useState(null);
    const [rightSideImage, setRightSideImage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // for navigation
    const { documentId } = useParams();
    const { t } = useTranslation(); // Hook for translation

    const handleFrontSideChange = (event) => {
        setFrontSideImage(event.target.files[0]);
    };

    const handleRightSideChange = (event) => {
        setRightSideImage(event.target.files[0]);
    };

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
        navigate('/'); // Navigate to the home page or change it to your desired route
    };

    const uploadImage = async (imageFile, userId) => {
        if (!imageFile) return null;

        try {
            // Create a unique file name
            const fileName = `${userId}_${Date.now()}_${imageFile.name}`;
            const imageRef = ref(storage, `images/${fileName}`);

            // Upload the file to Firebase Storage
            const snapshot = await uploadBytes(imageRef, imageFile);

            // Get the URL of the uploaded file
            const downloadUrl = await getDownloadURL(snapshot.ref);
            return downloadUrl;
        } catch (error) {
            console.error('Error uploading image: ', error);
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading

        try {
            // Assuming you have a method to handle the image upload and get the URL
            const frontImageUrl = await uploadImage(frontSideImage, documentId);
            const rightImageUrl = await uploadImage(rightSideImage, documentId);

            // Update the Firestore document with image URLs
            await updateDoc(doc(db, 'userDetails', documentId), {
                frontSideImage: frontImageUrl,
                rightSideImage: rightImageUrl,
            });

            setIsLoading(false); // Stop loading
            setShowSuccessMessage(true);

            // Navigate to the next page or show a success message
        } catch (error) {
            console.error("Error updating document:", error);
            setIsLoading(false); // Stop loading on error
        }
    };

    return (
        <div className="body-measurement-upload-page">
            {/* Instruction Section */}
            <section className="instruction-section">
                <h1>{t('bodyMeasurementUpload.title')}</h1>
                <p>{t('bodyMeasurementUpload.instructions')}</p>
                <ul>
                    <li>{t('bodyMeasurementUpload.instruction1')}</li>
                    <li>{t('bodyMeasurementUpload.instruction2')}</li>
                    <li>{t('bodyMeasurementUpload.instruction3')}</li>
                    <li>{t('bodyMeasurementUpload.instruction4')}</li>
                </ul>
            </section>

            {/* Photo Upload Section */}
            <section className="photo-upload-section">
                <form onSubmit={handleSubmit}>
                    {/* Front Side Upload */}
                    <div className="form-group">
                        <label htmlFor="front-side-upload">{t('bodyMeasurementUpload.uploadFrontSide')}</label>
                        <input type="file" id="front-side-upload" accept="image/*" onChange={handleFrontSideChange} />
                    </div>

                    {/* Right Side Upload */}
                    <div className="form-group">
                        <label htmlFor="right-side-upload">{t('bodyMeasurementUpload.uploadRightSide')}</label>
                        <input type="file" id="right-side-upload" accept="image/*" onChange={handleRightSideChange} />
                    </div>

                    <button type="submit" className="submit-btn">{t('bodyMeasurementUpload.submitButton')}</button>
                </form>
            </section>

            {showSuccessMessage && (
                <div className="message-overlay">
                    <div className="message-box">
                        <p>{t('bodyMeasurementUpload.successMessage1')}</p>
                        <p>{t('bodyMeasurementUpload.successMessage2')}</p>
                        <button onClick={handleCloseSuccessMessage} className="close-success-message">{t('bodyMeasurementUpload.closeButton')}</button>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="message-overlay">
                    <div className="message-box">
                        <h2>{t('bodyMeasurementUpload.loadingMessage')}</h2>
                        <p>{t('bodyMeasurementUpload.loadingDescription')}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BodyMeasurementUpload;
