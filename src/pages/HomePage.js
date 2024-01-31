import React from 'react';
import { useTranslation } from 'react-i18next';
import './HomePage.css';
import womanImage from '../components/women.png'; // Update the import path if necessary
import cherkiImage from '../components/cherki.jpeg';
import phillImage from '../components/phill.jpg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/FitnessResearchInitiative');
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <h1>{t('heroSection.title')}</h1>
                <p>{t('heroSection.description')}</p>
                <div className="get-started-btn-container" onClick={handleGetStartedClick}>
                    <button className="get-started-btn">{t('heroSection.getStartedButton')}</button>
                </div>
            </section>

            <div className="divider"></div> 

            {/* Project Background Section */}
            <section className="project-background-section">
                <div className="image-container">
                    <img src={womanImage} alt={t('projectBackground.imageAltWoman')} />
                </div>
                <div className="text-content">
                    <h2>{t('projectBackground.title')}</h2>
                    <h3>{t('projectBackground.subtitle')}</h3>
                    <p>{t('projectBackground.paragraph')}</p>
                    <ul>
                        <li><strong>{t('projectBackground.bullet1Title')}</strong> {t('projectBackground.bullet1Text')}</li>
                        <li><strong>{t('projectBackground.bullet2Title')}</strong> {t('projectBackground.bullet2Text')}</li>
                    </ul>
                    <p>{t('projectBackground.conclusion')}</p>
                </div>
            </section>

            <div className="divider"></div> {/* The orange line divider */}

            {/* Survey Section */}
            <section className="survey-section">
                <div className="content">
                    <h2>{t('surveySection.title')}</h2>
                    <p>{t('surveySection.description')}</p>
                    <ul>
                        <li>{t('surveySection.bullet1')}</li>
                        <li>{t('surveySection.bullet2')}</li>
                        <li>{t('surveySection.bullet3')}</li>
                    </ul>
                    <p>{t('surveySection.conclusion')}</p>
                    <div className="get-started-btn-container" onClick={handleGetStartedClick}>
                        <button className="get-started-btn">{t('surveySection.getStartedButton')}</button>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <h2>{t('teamSection.title')}</h2>
                <div className="team-members">
                    <div className="team-member">
                        <img src={cherkiImage} alt={t('teamSection.cherkiAlt')} className="team-photo" />
                        <h3>{t('teamSection.cherkiName')}</h3>
                        <p className="title">{t('teamSection.cherkiTitle')}</p>
                        <p>{t('teamSection.cherkiDescription')}</p>
                    </div>
                    <div className="team-member">
                        <img src={phillImage} alt={t('teamSection.phillAlt')} className="team-photo" />
                        <h3>{t('teamSection.phillName')}</h3>
                        <p className="title">{t('teamSection.phillTitle')}</p>
                        <p>{t('teamSection.phillDescription')}</p>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <section className="footer-section">
                <div className="footer-content">
                    <div className="footer-block">
                        <h4>{t('footerSection.findUs')}</h4>
                        <p>{t('footerSection.email')} <a href="mailto:cm1557@student.aru.ac.uk">{t('footerSection.emailLink')}</a></p>
                    </div>
                    <div className="footer-block">
                        <h4>{t('footerSection.visitUs')}</h4>
                        <address>
                            {t('footerSection.address')}
                        </address>
                    </div>
                    {/* Additional footer content can go here */}
                </div>
                <div className="footer-bottom">
                    <p>{t('footerSection.copyright')}</p>
                </div>
            </section>

            {/* Other sections can be added here */}
        </div>
    );
};

export default HomePage;
