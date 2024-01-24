import React from 'react';
import './FitnessResearchInitiative.css'; // Make sure to create a corresponding CSS file
import { useNavigate } from 'react-router-dom';

const FitnessResearchInitiative = () => {
    const navigate = useNavigate();

    const handleStartSurvey = () => {
        navigate('/ParticipantConsentForm'); // Replace '/survey' with the actual route to your survey
    };

    return (
        <div className="fitness-research-initiative-page">
            <h1>Participate in Our Fitness Research Initiative</h1>
            <p>We are a team at Zaka Coach, working on a cutting-edge project to integrate artificial intelligence with personalized fitness. We're collecting data to understand how different individuals respond to various workout routines and nutrition plans.</p>
            <p>Your participation involves answering questions about your fitness habits and preferences. "Responses" here mean any noticeable changes in your physical or mental state attributable to your fitness activities.</p>
            <p>Each contribution is pivotal. With your help, our AI can learn to make precise recommendations, adapting to individual needs and enhancing the personalization of fitness plans.</p>
            <p>If you have a passion for fitness and are curious about the potential of AI to transform health and exercise, your insights are invaluable to us.</p>
            <p>Upon completing the survey, <strong>you will be rewarded with a customized meal plan and workout program designed by expert personal trainers,</strong> crafted to support and elevate your fitness journey.</p>
            <button onClick={handleStartSurvey} className="start-survey-btn">Begin Survey & Claim Your Plan</button>
        </div>
    );
};

export default FitnessResearchInitiative;
