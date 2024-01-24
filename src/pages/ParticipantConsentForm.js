import React, { useState } from 'react';
import './ParticipantConsentForm.css'; // Ensure you have a corresponding CSS file
import { useNavigate } from 'react-router-dom';


const ParticipantConsentForm = () => {


    const navigate = useNavigate();


    // State to manage the consent checkboxes
    const [consents, setConsents] = useState({
        consentToItems: false,
        confirmAge: false,
    });

    const handleCheckboxChange = (event) => {
        setConsents({ ...consents, [event.target.name]: event.target.checked });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Check if both checkboxes are selected
        if (consents.consentToItems && consents.confirmAge) {
            navigate('/PersonalDetails'); // Navigate to the next page
        } else {
            // Display a message to the user to select both checkboxes
            alert("Please select both checkboxes to proceed.");
        }
    };
    



    return (
        <div className="consent-form-container">
            <form onSubmit={handleSubmit} className="consent-form">
                <h1>Participant Consent Form</h1>
                <p>Your participation in our study is crucial to advancing personalized fitness. Please read and acknowledge the statements below.</p>
                
                <ol className="consent-list">
                    <li>I have read the <a href="/participant-info" target="_blank">Participant Information Sheet</a> and my questions have been answered satisfactorily.</li>
                    <li>My participation is voluntary and I can withdraw at any time without giving a reason, without my legal rights being affected.</li>
                    <li>Any data collected may be included in an anonymous form in publications or presentations resulting from this research.</li>
                    <li>A fully anonymised dataset may be made publicly available in a data repository after the study concludes.</li>
                    <li>Relevant personnel from ARUI or regulatory authorities may review the collected data as part of their duty.</li>
                    <li>I understand the benefits of participating and agree to partake in this study.</li>
                </ol>


                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="consentToItems"
                        name="consentToItems"
                        checked={consents.consentToItems}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="consentToItems">I consent to items 1 to 6 listed above.</label>
                </div>
                
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="confirmAge"
                        name="confirmAge"
                        checked={consents.confirmAge}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="confirmAge">I confirm that I am 18 years of age or older.</label>
                </div>

                <button type="submit" className="agree-button">Agree and Continue</button>
            </form>
        </div>
    );
};

export default ParticipantConsentForm;
