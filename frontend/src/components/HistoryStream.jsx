import React from 'react';

export default function HistoryStream({ history, onSelectCity }) {
    if (!history || history.length === 0) return null;

    return (
        <div className="mt-1">
            <h3 className="text-[0.85rem] font-bold text-[#94a3b8] uppercase tracking-wider mb-3">
                Synchronized Search Database Stream
            </h3>
            <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
                {history.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectCity(item.city || item)}
                        className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] px-4 py-2.5 rounded-xl text-[0.85rem] font-medium text-white whitespace-nowrap cursor-pointer hover:bg-[rgba(139,92,246,0.15)] hover:border-[#8b5cf6] hover:text-[#c4b5fd] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all"
                    >
                        {item.city ? `${item.city} • ${item.temperature || ''}` : item}
                    </button>
                ))}
            </div>
        </div>
    );
}