'use client';

import { WorkoutType } from './types';
import { workoutConfig } from './constants';
import { Zap, Activity, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface EnergyCardProps {
    workout: WorkoutType;
}

const colorMap: Record<string, string> = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#22c55e',
    purple: '#a855f7',
    yellow: '#eab308',
};

export function EnergyCard({ workout }: EnergyCardProps) {
    const data = workoutConfig[workout];
    const percentage = (data.energyLevel / 10) * 100;
    const color = colorMap[data.color as keyof typeof colorMap] ?? '#a855f7';
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="card card-hover-effect"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                borderColor: isHovered ? `${color}35` : undefined,
                boxShadow: isHovered ? `0 8px 32px ${color}30, 0 2px 8px rgba(0,0,0,0.4)` : undefined,
                transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div
                    style={{
                        padding: '0.65rem',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${color}20, ${color}35)`,
                        border: `1px solid ${color}25`,
                        transform: isHovered ? 'scale(1.1) rotate(-6deg)' : 'scale(1)',
                        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                        boxShadow: isHovered ? `0 0 16px ${color}40` : 'none',
                    }}
                >
                    <Zap style={{ width: '1.125rem', height: '1.125rem', color }} />
                </div>
                <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)', marginBottom: '0.2rem' }}>
                        Status de Energia
                    </p>
                    <p style={{ fontSize: '1.375rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
                        {data.energyLabel}
                    </p>
                </div>
            </div>

            {/* Level row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--fg-secondary)' }}>Nível de Esforço</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color, fontVariantNumeric: 'tabular-nums' }}>
                    {data.energyLevel}/10
                </span>
            </div>

            {/* Energy bar */}
            <div className="energy-bar energy-bar-animated" style={{ marginBottom: '1rem' }}>
                <div
                    className="energy-bar-fill"
                    style={{
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, ${color}80, ${color})`,
                        transition: 'width 0.8s cubic-bezier(0.23,1,0.32,1)',
                    }}
                />
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isHovered
                    ? <TrendingUp style={{ width: '0.875rem', height: '0.875rem', color, animation: 'pulse-soft 1s ease infinite' }} />
                    : <Activity style={{ width: '0.875rem', height: '0.875rem', color: 'var(--fg-muted)' }} />
                }
                <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>
                    Preparado para {data.name.toLowerCase()}
                </span>
            </div>
        </div>
    );
}