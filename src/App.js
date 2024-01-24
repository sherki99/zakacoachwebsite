import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PersonalDetails from './pages/PersonalDetails';
import WorkoutDetails from './pages/WorkoutDetails';
import NutrionDetails from './pages/NutrionDetails'; 
import BodyMeasurementUpload from './pages/BodyMeasurementUpload';
import ParticipantConsentForm from './pages/ParticipantConsentForm';
import FitnessResearchInitiative from './pages/FitnessResearchInitiative';
import ParticipantInfoSheet from './pages/ParticipantInfoSheet';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/PersonalDetails" element={<PersonalDetails />} />
                <Route path="/WorkoutDetails/:documentId" element={<WorkoutDetails />} />
                <Route path="/NutrionDetails/:documentId" element={<NutrionDetails />} />
                <Route path="/BodyMeasurementUpload/:documentId" element={<BodyMeasurementUpload />} />
                <Route path="/ParticipantConsentForm" element={<ParticipantConsentForm />} />
                <Route path="/FitnessResearchInitiative" element={<FitnessResearchInitiative />} />
                <Route path="/participant-info" element={<ParticipantInfoSheet />} />
            
            </Routes>
        </Router>
    );
};

export default App;
