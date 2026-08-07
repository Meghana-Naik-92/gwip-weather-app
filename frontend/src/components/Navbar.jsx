import React from 'react';

export default function Navbar({ username, onLogout }) {
    return (
        <header className="flex justify-between items-center px-9 py-6 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-white">
                <i className="fa-solid fa-cube text-[#8b5cf6] text-xl drop-shadow-[0_0_10px_rgba(139,92,246,0.35)]"></i>
                GWIP // ELITE STUDIO
            </div>
            
            <div className="flex items-center gap-4">
                <div className="bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.25)] text-[#c4b5fd] px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full shadow-[0_0_8px_#10b981]"></span>
                    {username || 'weatherfan@example.com'}
                </div>
                
                <button 
                    onClick={onLogout}
                    className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] hover:text-white hover:border-[#8b5cf6] px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}