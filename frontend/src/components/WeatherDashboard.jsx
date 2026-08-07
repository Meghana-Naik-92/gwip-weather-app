import React, { useState, useEffect } from 'react';
import api from '../services/api';
import HistoryStream from './HistoryStream';

export default function WeatherDashboard() {
    // State management for user input, weather results, history, and loading states
    const [cityInput, setCityInput] = useState('London');
    const [weatherData, setWeatherData] = useState({
        city: 'London, United Kingdom',
        temp: '30.88°C',
        cond: 'Scattered Clouds Atmospheric Readout',
        humidity: '37%',
        wind: '3.13 m/s',
        icon: 'fa-cloud-sun'
    });
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch user search history from Spring Boot backend database
    const fetchHistory = async () => {
        try {
            const response = await api.get('/weather/history');
            if (response.data && response.data.content) {
                // Map Spring Data Page content to history stream format
                const formattedHistory = response.data.content.map(item => ({
                    city: item.cityName,
                    temperature: `${item.temperature}°C`
                }));
                setHistory(formattedHistory);
            }
        } catch (err) {
            console.error("Could not fetch search history", err);
        }
    };

    // Load history when the dashboard mounts
    useEffect(() => {
        fetchHistory();
    }, []);

    // Function to fetch weather data from backend or fallback to simulation
    const fetchWeather = async (targetCity) => {
        const queryCity = targetCity || cityInput;
        if (!queryCity.trim()) return;

        setLoading(true);
        try {
            // Attempt to fetch from Spring Boot backend endpoint
            const response = await api.get(`/weather?city=${encodeURIComponent(queryCity)}`);
            if (response.data) {
                setWeatherData({
                    city: `${response.data.cityName.toUpperCase()}, GLOBAL TELEMETRY`,
                    temp: `${response.data.temperature}°C`,
                    cond: response.data.description || response.data.weatherCondition || 'Optimal Atmospheric Stability',
                    humidity: `${response.data.humidity}%`,
                    wind: `${response.data.windSpeed} m/s`,
                    icon: 'fa-cloud-sun'
                });
                
                // Refresh history stream from backend after a successful search
                await fetchHistory();
            }
        } catch (err) {
            // Fallback mock simulation data if backend is offline
            const mockDatabase = {
                'London': { temp: '30.88°C', cond: 'Scattered Clouds Atmospheric Readout', humidity: '37%', wind: '3.13 m/s', icon: 'fa-cloud-sun' },
                'Bengaluru': { temp: '25.83°C', cond: 'Moderate Rain Precipitation Feed', humidity: '72%', wind: '5.05 m/s', icon: 'fa-cloud-rain' },
                'Kasa': { temp: '14.17°C', cond: 'Broken Clouds High-Altitude Sync', humidity: '76%', wind: '1.44 m/s', icon: 'fa-cloud' },
                'Tokyo': { temp: '19.50°C', cond: 'Crystal Clear Horizon Metric', humidity: '45%', wind: '2.80 m/s', icon: 'fa-sun' }
            };

            const matched = mockDatabase[queryCity] || {
                temp: (Math.random() * 20 + 10).toFixed(2) + '°C',
                cond: 'Atmospheric Telemetry Live Sync',
                humidity: Math.floor(Math.random() * 40 + 30) + '%',
                wind: (Math.random() * 3 + 1).toFixed(2) + ' m/s',
                icon: 'fa-sun'
            };

            setWeatherData({
                city: `${queryCity.toUpperCase()}, GLOBAL TELEMETRY`,
                ...matched
            });
        } finally {
            setLoading(false);
        }
    };

    // Handler when user clicks a chip from search history
    const handleHistorySelect = (selectedCity) => {
        setCityInput(selectedCity);
        fetchWeather(selectedCity);
    };

    return (
        <div className="p-9 flex flex-col gap-6">
            
            {/* Search Console Input and Execute Button */}
            <div className="flex gap-3.5">
                <input 
                    type="text" 
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
                    placeholder="Query any global coordinates / city (e.g. London, Tokyo, Bengaluru)..." 
                    className="flex-1 bg-[rgba(10,10,15,0.6)] border border-[rgba(255,255,255,0.08)] px-5.5 py-4 rounded-[18px] text-base text-white outline-none focus:border-[#8b5cf6] focus:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
                />
                <button 
                    onClick={() => fetchWeather()}
                    disabled={loading}
                    className="bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white font-bold px-8 rounded-[18px] text-sm tracking-wide shadow-lg shadow-[#8b5cf6]/30 hover:shadow-[#8b5cf6]/50 hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
                >
                    {loading ? 'Syncing...' : 'Search'}
                </button>
            </div>

            {/* Weather Hero Display Card with Neon Highlights */}
            <div className="bg-gradient-to-br from-[rgba(20,20,30,0.6)] to-[rgba(10,10,15,0.8)] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-9 flex justify-between items-center relative overflow-hidden">
                <div className="hero-details">
                    <div className="text-[0.8rem] font-bold text-[#94a3b8] uppercase tracking-[1.5px] mb-1.5">
                        {weatherData.city}
                    </div>
                    <h1 className="text-[3.8rem] font-extrabold tracking-tight text-white my-1">
                        {weatherData.temp}
                    </h1>
                    <div className="text-[1.05rem] font-semibold text-[#06b6d4] tracking-wide">
                        {weatherData.cond}
                    </div>
                </div>
                <div className="text-[5.5rem] text-[#e2e8f0] drop-shadow-[0_15px_25px_rgba(255,255,255,0.15)]">
                    <i className={`fa-solid ${weatherData.icon}`}></i>
                </div>
            </div>

            {/* Metrics Data Grid (Humidity & Wind Velocity) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[rgba(15,15,22,0.5)] border border-[rgba(255,255,255,0.08)] p-5.5 rounded-[20px] flex items-center gap-4.5">
                    <i className="fa-solid fa-droplet text-[1.6rem] text-[#06b6d4] bg-[#06b6d4]/10 p-3.5 rounded-[14px]"></i>
                    <div>
                        <div className="text-xl font-bold tracking-tight text-white">{weatherData.humidity}</div>
                        <div className="text-xs text-[#94a3b8] font-medium mt-0.5">Relative Humidity</div>
                    </div>
                </div>

                <div className="bg-[rgba(15,15,22,0.5)] border border-[rgba(255,255,255,0.08)] p-5.5 rounded-[20px] flex items-center gap-4.5">
                    <i className="fa-solid fa-wind text-[1.6rem] text-[#10b981] bg-[#10b981]/10 p-3.5 rounded-[14px]"></i>
                    <div>
                        <div className="text-xl font-bold tracking-tight text-white">{weatherData.wind}</div>
                        <div className="text-xs text-[#94a3b8] font-medium mt-0.5">Wind Velocity</div>
                    </div>
                </div>
            </div>

            {/* History Stream Timeline Chips */}
            <HistoryStream history={history} onSelectCity={handleHistorySelect} />

            {/* Copyright Footer */}
            <div className="text-center text-xs text-[#64748b] mt-6 tracking-widest uppercase">
                &copy; 2026 Meghananaik. All rights reserved.
            </div>

        </div>
    );
}