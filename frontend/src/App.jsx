import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthCard from './components/AuthCard';
import WeatherDashboard from './components/WeatherDashboard';

export default function App() {
    // State to track if user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    // Check localStorage on initial load for existing token
    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        const savedUser = localStorage.getItem('username');
        if (token) {
            setIsAuthenticated(true);
            if (savedUser) setUsername(savedUser);
        }
    }, []);

    // Handler when user successfully logs in or registers
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setUsername(localStorage.getItem('username') || 'weatherfan');
    };

    // Handler for user logout
    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setUsername('');
    };

    return (
        <div className="bg-[#050508] bg-[radial-gradient(circle_at_15%_15%,rgba(139,92,246,0.15)_0%,transparent_45%),radial-gradient(circle_at_85%_85%,rgba(6,182,212,0.12)_0%,transparent_45%),radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_60%)] bg-fixed text-slate-100 min-h-screen flex justify-center items-center p-6 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
            
            {/* Main Luxury Glass Container */}
            <div className="w-full max-w-[940px] bg-[rgba(18,18,26,0.75)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.08)] rounded-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(139,92,246,0.12)] overflow-hidden flex flex-col relative before:content-[''] before:absolute before:top-0 before:left-[20%] before:right-[20%] before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[#8b5cf6] before:to-transparent">
                
                {/* Conditionally render Navbar only when logged in */}
                {isAuthenticated && <Navbar username={username} onLogout={handleLogout} />}

                {/* Viewport Area: Switches between Auth Card and Weather Dashboard */}
                <main className="p-9 flex flex-col justify-center">
                    {!isAuthenticated ? (
                        <AuthCard onLoginSuccess={handleLoginSuccess} />
                    ) : (
                        <WeatherDashboard />
                    )}
                </main>

            </div>
        </div>
    );
}