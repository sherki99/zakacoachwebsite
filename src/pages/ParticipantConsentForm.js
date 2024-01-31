import React, { useState } from 'react';
import './ParticipantConsentForm.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const ParticipantConsentForm = () => {
    const { t } = useTranslation(); // Initialize translation hook
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
            alert(t('pleaseSelectCheckboxes'));
        }
    };

    return (
        <div className="consent-form-container">
            <form onSubmit={handleSubmit} className="consent-form">
                <h1>{t('participantConsentForm.title')}</h1>
                <p>{t('participantConsentForm.instructions')}</p>

                <ol className="consent-list">
                    <li>{t('participantConsentForm.statement1')}</li>
                    <li>{t('participantConsentForm.statement2')}</li>
                    <li>{t('participantConsentForm.statement3')}</li>
                    <li>{t('participantConsentForm.statement4')}</li>
                    <li>{t('participantConsentForm.statement5')}</li>
                    <li>{t('participantConsentForm.statement6')}</li>
                </ol>

                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="consentToItems"
                        name="consentToItems"
                        checked={consents.consentToItems}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="consentToItems">{t('participantConsentForm.consentToItems')}</label>
                </div>

                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="confirmAge"
                        name="confirmAge"
                        checked={consents.confirmAge}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="confirmAge">{t('participantConsentForm.confirmAge')}</label>
                </div>

                <button type="submit" className="agree-button">{t('participantConsentForm.agreeAndContinue')}</button>
            </form>
        </div>
    );
};

export default ParticipantConsentForm;
