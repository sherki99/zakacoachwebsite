import React, { useState } from 'react';
import './BodyMeasurementUpload.css';
import { useParams, useNavigate  } from 'react-router-dom';
import { db } from './firebaseConfig'; // Ensure the path is correct
import { doc, updateDoc } from 'firebase/firestore';
import { storage } from './firebaseConfig'; // Update the path as necessary
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const BodyMeasurementUpload = () => {
    const [frontSideImage, setFrontSideImage] = useState(null);
    const [rightSideImage, setRightSideImage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate(); // for navigation
    const [isLoading, setIsLoading] = useState(false);
    

    const { documentId } = useParams(); 

    const handleFrontSideChange = (event) => {
        setFrontSideImage(event.target.files[0]);
    };

    const handleRightSideChange = (event) => {
        setRightSideImage(event.target.files[0]);
    };

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
        navigate('/'); // Navigate to home page. Change this to your home route
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
        // Handle the form submission, image upload, and save image info to Firestore


        setIsLoading(true); // Start loading


        try {
            // Assuming you have a method to handle the image upload and get the URL
            const frontImageUrl = await uploadImage(frontSideImage);
            const rightImageUrl = await uploadImage(rightSideImage);

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
                <h1>Body Measurement Photo Upload</h1>
                <p>To ensure the accuracy of body measurements, please follow the guidelines below when taking your photos:</p>
                <ul>
                    <li>Stand against a plain background with sufficient lighting.</li>
                    <li>Wear fitted clothing to allow clear visibility of body contours.</li>
                    <li>Hold the camera steady at midsection height.</li>
                    <li>Ensure the full body is visible in the frame, from head to toe.</li>
                </ul>
            </section>

            {/* Photo Upload Section */}
            <section className="photo-upload-section">
                <form onSubmit={handleSubmit}>
                    {/* Front Side Upload */}
                    <div className="form-group">
                        <label htmlFor="front-side-upload">Upload Front Side</label>
                        <input type="file" id="front-side-upload" accept="image/*" onChange={handleFrontSideChange} />
                    </div>

                    {/* Right Side Upload */}
                    <div className="form-group">
                        <label htmlFor="right-side-upload">Upload Right Side</label>
                        <input type="file" id="right-side-upload" accept="image/*" onChange={handleRightSideChange} />
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </section>

            {showSuccessMessage && (
            <div className="message-overlay">
            <div className="message-box">
                                <p>Thank you! Your images have been uploaded successfully.</p>
                                <p>You will receive a personalized workout plan within the next 20 working days.</p>
                        <button onClick={handleCloseSuccessMessage} className="close-success-message">Close</button>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="message-overlay">
                    <div className="message-box">
                        <h2>Processing Your Request</h2>
                        <p>Please wait while we process your images. This might take a few moments.</p>
                    </div>
                </div>
            )}




        </div>
    );
};

export default BodyMeasurementUpload;
