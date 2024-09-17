import React from 'react';
import "./HomePage.css";

const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            <header className="header">
                <h1>Pharmacy Dashboard</h1>
                <nav>
                    <ul>
                        <li><a href="#overview">Overview</a></li>
                        <li><a href="#quick-actions">Quick Actions</a></li>
                        <li><a href="#notifications">Notifications</a></li>
                        <li><a href="#account">Account</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <section id="overview" className="section overview">
                    <h2>Overview</h2>
                    <div className="cards">
                        <div className="card">
                            <h3>Prescriptions</h3>
                            <p>Manage all prescriptions here.</p>
                            <a href="/prescription" className="btn">View Prescriptions</a>
                        </div>
                        <div className="card">
                            <h3>Patients</h3>
                            <p>View and manage patient information.</p>
                            <a href="/patient" className="btn">View Patients</a>
                        </div>
                        <div className="card">
                            <h3>Inventory</h3>
                            <p>Check and update inventory levels.</p>
                            <a href="/rxitem" className="btn">View Inventory</a>
                        </div>
                    </div>
                </section>
                <section id="quick-actions" className="section quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="actions">
                        <button className="btn">Add Prescription</button>
                        <button className="btn">Update Inventory</button>
                        <button className="btn">Add Patient</button>
                    </div>
                </section>
                <section id="notifications" className="section notifications">
                    <h2>Notifications</h2>
                    <ul>
                        <li>No new notifications</li>
                    </ul>
                </section>
                <section id="account" className="section account">
                    <h2>Account</h2>
                    <p>Manage your account settings and preferences.</p>
                    <a href="/account" className="btn">Account Settings</a>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
