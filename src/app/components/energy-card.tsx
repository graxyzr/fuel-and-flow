'use client';

import { WorkoutType } from './types';
import { workoutConfig } from './constants';
import { Zap, Activity, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface EnergyCardProps {
    workout: WorkoutType;
}

const colorMap = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#22c55e',
    purple: '#a855f7',
    yellow: '#eab308',
};

export function EnergyCard({ workout }: EnergyCardProps) {
    const data = workoutConfig[workout];
    const percentage = (data.energyLevel / 10) * 100;
    const colorValue = colorMap[data.color as keyof typeof colorMap];
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all hover:scale-105 duration-300 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center gap-3 mb-4">
                <div
                    className="p-3 rounded-lg transition-all duration-300"
                    style={{
                        background: `linear-gradient(to bottom right, ${colorValue}20, ${colorValue}40)`,
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                >
                    <Zap className="w-5 h-5" style={{ color: colorValue }} />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-zinc-400">Status de Energia</h3>
                    <p className="text-2xl font-bold text-white">{data.energyLabel}</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Nível de Esforço</span>
                    <span className="font-medium" style={{ color: colorValue }}>
                        {data.energyLevel}/10
                    </span>
                </div>

                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: colorValue
                        }}
                    />
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm text-zinc-400">
                    {isHovered ? (
                        <TrendingUp className="w-4 h-4 animate-pulse" />
                    ) : (
                        <Activity className="w-4 h-4" />
                    )}
                    <span>Preparado para {data.name.toLowerCase()}</span>
                </div>
            </div>
        </div>
    );
}