import React from 'react';
import './HomePage.css';
import womanImage from '../components/women.png'; // Update the import path if necessary
import cherkiImage from '../components/cherki.jpeg';
import phillImage from '../components/phill.jpg';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {


    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        // Navigate to the next page when the button is clicked
        navigate('/FitnessResearchInitiative');
    };
    
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <h1>Contribute to Innovative Health Research: Comparing AI and Expert Plans</h1>
                <p>Welcome to Zaka Coach, a groundbreaking study at Anglia Ruskin University examining the effectiveness of AI in health planning. Join us to compare AI-created and expert-designed fitness and meal plans. Your participation provides valuable insights, helping shape the future of personalized health and fitness solutions</p>
                <div className="get-started-btn-container" onClick={handleGetStartedClick}>
                        <button className="get-started-btn">GET STARTED</button>
                </div>
            </section>

            <div className="divider"></div> 
  
            <section className="project-background-section">

               <div className="image-container">
                    <img src={womanImage} alt="Woman stretching" />
                </div>

                <div className="text-content">
                <h2>Project Background</h2>
                <h3>Revolutionizing Fitness with AI: A Comparative Study</h3>
                <p>
                    In our study, we're investigating the efficacy of AI-generated fitness and meal plans versus those created by experienced personal trainers. Key aspects of our research include:
                </p>
                <ul>

                    <li>
                    <strong>Comparative Analysis:</strong> Assessing the effectiveness of AI in crafting personalized health plans compared to expert human input.
                    </li>
                    <li>
                    <strong>Free Expert Plans:</strong> Offering participants complimentary meal and workout plans designed by professional personal trainers.
                    </li>
                </ul>
                <p>
                    Our goal is to merge technological innovation with expert knowledge, enhancing the way personal health and fitness are approached, for the benefit of individual wellness journeys.
                </p>
                </div>


            </section>

            <div className="divider"></div> {/* The orange line divider */}

            <section className="survey-section">
            <div className="content">
                <h2>Take Our Survey</h2>
                <p>We are seeking male participants aged 18 to 35 who are interested in muscle gain and size enhancement. Your insights will be instrumental in evaluating and enhancing AI-generated fitness and meal plans. We are looking for individuals who:</p>
                <ul>
                    <li>Are males aged 18 to 35.</li>
                    <li>Have a goal of muscle gain or size enhancement.</li>
                    <li>Are interested in exploring innovative fitness and nutrition strategies.</li>
                </ul>
                <p>Participation in this survey is completely voluntary, and all your responses will remain confidential.</p>
                <div className="get-started-btn-container" onClick={handleGetStartedClick}>
                        <button className="get-started-btn">GET STARTED</button>
                </div>
                </div>
            </section>


            <section className="team-section">
            <h2>Our Team</h2>
            <div className="team-members">
                <div className="team-member">
                    <img src={cherkiImage} alt="Cherki Meziane" className="team-photo" />
                    <h3>Cherki Meziane</h3>
                    <p className="title">Research Fellow at Anglia Ruskin University</p>
                    <p>Cherki, who is currently immersed in the world of machine learning, seamlessly merges his profound passion for fitness with cutting-edge technology, forging innovative pathways in the realm of health and wellness.</p>
                </div>
                <div className="team-member">
                    <img src={phillImage} alt="Phillip Kasozi" className="team-photo" />
                    <h3>Phillip Kasozi</h3>
                    <p className="title">Director at Kasozi Wellbeing</p>
                    <p>A former sports science student at the University of Manchester, Phill now directs Kasozi Wellbeing, where he channels his deep knowledge of sports science and his passion for wellness into creating positive changes in workplace health</p>
                    </div>
                </div>
            </section>


                        {/* New Footer Section */}
            <section className="footer-section">
                <div className="footer-content">
                    <div className="footer-block">
                        <h4>FIND US</h4>
                        <p>Email: <a href="mailto:cm1557@student.aru.ac.uk">cm1557@student.aru.ac.uk</a></p>
                    </div>
                    <div className="footer-block">
                        <h4>VISIT US</h4>
                        <address>
                            Anglia Ruskin University,<br />
                            East Rd,<br />
                            Cambridge<br />
                            CB1 1PT<br />
                            UK
                        </address>
                    </div>
                    <div className="footer-block">
                        <h4>ABOUT</h4>
                        {/* Social icons would be inserted here */}
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Copyright © 2021 Zaka Coach</p>
                </div>
            </section>






            {/* Other sections can be added here */}
        </div>
    );
};

export default HomePage;



