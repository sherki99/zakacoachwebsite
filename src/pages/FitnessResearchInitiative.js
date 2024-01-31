import React from 'react';
import { useTranslation } from 'react-i18next';
import './FitnessResearchInitiative.css'; // Make sure to create a corresponding CSS file
import { useNavigate } from 'react-router-dom';

const FitnessResearchInitiative = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleStartSurvey = () => {
        navigate('/ParticipantConsentForm'); // Replace with the actual route
    };

    return (
        <div className="fitness-research-initiative-page">
            <h1>{t('fitnessResearchInitiative.title')}</h1>
            <p>{t('fitnessResearchInitiative.paragraph1')}</p>
            <p>{t('fitnessResearchInitiative.paragraph2')}</p>
            <p>{t('fitnessResearchInitiative.paragraph3')}</p>
            <p>{t('fitnessResearchInitiative.paragraph4')}</p>
            <p>{t('fitnessResearchInitiative.paragraph5')}</p>
            <button onClick={handleStartSurvey} className="start-survey-btn">
                {t('fitnessResearchInitiative.startSurveyButton')}
            </button>
        </div>
    );
};

export default FitnessResearchInitiative;
