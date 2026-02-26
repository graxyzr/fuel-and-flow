'use client';

import { WorkoutType } from './types';
import { workoutConfig } from './constants';
import { Utensils, Sunrise, Sunset, Plus, Check, Droplet } from 'lucide-react';
import { useState } from 'react';

interface NutritionCardProps {
    workout: WorkoutType;
}

const colorMap: Record<string, string> = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#22c55e',
    purple: '#a855f7',
    yellow: '#eab308',
};

export function NutritionCard({ workout }: NutritionCardProps) {
    const data = workoutConfig[workout];
    const color = colorMap[data.color as keyof typeof colorMap] ?? '#a855f7';
    const [preChecked, setPreChecked] = useState(false);
    const [postChecked, setPostChecked] = useState(false);
    const [showWater, setShowWater] = useState(false);
    const [waterIntake, setWaterIntake] = useState(0);
    const waterGoal = 2000;
    const waterPct = (waterIntake / waterGoal) * 100;
    const mealPct = (preChecked ? 50 : 0) + (postChecked ? 50 : 0);

    const handleAddWater = () => setWaterIntake(p => Math.min(p + 250, waterGoal));

    return (
        <div
            className="card card-hover-effect"
            style={{ transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        padding: '0.65rem',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${color}20, ${color}35)`,
                        border: `1px solid ${color}25`,
                    }}>
                        <Utensils style={{ width: '1.125rem', height: '1.125rem', color }} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)', marginBottom: '0.15rem' }}>
                            Nutrição
                        </p>
                        <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>Fuel</p>
                    </div>
                </div>

                {/* Water toggle */}
                <button
                    onClick={() => setShowWater(v => !v)}
                    style={{
                        padding: '0.4rem',
                        borderRadius: '8px',
                        background: showWater ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${showWater ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.07)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                    title="Hidratação"
                >
                    <Droplet style={{ width: '1rem', height: '1rem', color: showWater ? '#3b82f6' : 'rgba(255,255,255,0.4)' }} />
                </button>
            </div>

            {/* ── MEALS VIEW ── */}
            {!showWater ? (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                        {/* Pré */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <button
                                onClick={() => setPreChecked(v => !v)}
                                style={{
                                    marginTop: '0.2rem',
                                    width: '1.2rem', height: '1.2rem',
                                    borderRadius: '5px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                    cursor: 'pointer',
                                    background: preChecked ? 'var(--rest)' : 'rgba(255,255,255,0.05)',
                                    border: `1px solid ${preChecked ? 'var(--rest)' : 'rgba(255,255,255,0.12)'}`,
                                    boxShadow: preChecked ? '0 0 10px var(--rest-glow)' : 'none',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {preChecked && <Check style={{ width: '0.65rem', height: '0.65rem', color: '#fff' }} />}
                            </button>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                                    <Sunrise style={{ width: '0.875rem', height: '0.875rem', color }} />
                                    <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-muted)' }}>Pré-treino</span>
                                </div>
                                <p style={{
                                    fontSize: '0.875rem', fontWeight: 500, color: preChecked ? 'var(--fg-muted)' : '#fff',
                                    textDecoration: preChecked ? 'line-through' : 'none',
                                    transition: 'all 0.25s',
                                }}>
                                    {data.preWorkout}
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="divider" style={{ margin: '0' }} />

                        {/* Pós */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <button
                                onClick={() => setPostChecked(v => !v)}
                                style={{
                                    marginTop: '0.2rem',
                                    width: '1.2rem', height: '1.2rem',
                                    borderRadius: '5px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                    cursor: 'pointer',
                                    background: postChecked ? 'var(--rest)' : 'rgba(255,255,255,0.05)',
                                    border: `1px solid ${postChecked ? 'var(--rest)' : 'rgba(255,255,255,0.12)'}`,
                                    boxShadow: postChecked ? '0 0 10px var(--rest-glow)' : 'none',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {postChecked && <Check style={{ width: '0.65rem', height: '0.65rem', color: '#fff' }} />}
                            </button>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                                    <Sunset style={{ width: '0.875rem', height: '0.875rem', color }} />
                                    <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-muted)' }}>Pós-treino</span>
                                </div>
                                <p style={{
                                    fontSize: '0.875rem', fontWeight: 500, color: postChecked ? 'var(--fg-muted)' : '#fff',
                                    textDecoration: postChecked ? 'line-through' : 'none',
                                    transition: 'all 0.25s',
                                }}>
                                    {data.postWorkout}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Meal progress */}
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Progresso do dia</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color }}>{mealPct}%</span>
                        </div>
                        <div className="energy-bar">
                            <div
                                className="energy-bar-fill"
                                style={{
                                    width: `${mealPct}%`,
                                    background: `linear-gradient(90deg, ${color}80, ${color})`,
                                    transition: 'width 0.5s cubic-bezier(0.23,1,0.32,1)',
                                }}
                            />
                        </div>
                    </div>
                </>
            ) : (
                /* ── WATER VIEW ── */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Droplet style={{ width: '0.875rem', height: '0.875rem', color: '#3b82f6' }} />
                            <span style={{ fontSize: '0.8125rem', color: 'var(--fg-secondary)', fontWeight: 500 }}>Hidratação</span>
                        </div>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: waterPct >= 100 ? 'var(--rest)' : '#3b82f6', fontVariantNumeric: 'tabular-nums' }}>
                            {waterIntake}ml / {waterGoal}ml
                        </span>
                    </div>

                    <div className="energy-bar energy-bar-animated">
                        <div
                            className="energy-bar-fill energy-bar-fill-pull"
                            style={{ width: `${waterPct}%`, transition: 'width 0.5s cubic-bezier(0.23,1,0.32,1)' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                        {[1, 2, 3, 4].map(i => (
                            <button
                                key={i}
                                onClick={handleAddWater}
                                disabled={waterIntake >= waterGoal}
                                style={{
                                    padding: '0.5rem 0.25rem',
                                    borderRadius: '10px',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                                    background: 'rgba(59,130,246,0.08)',
                                    border: '1px solid rgba(59,130,246,0.2)',
                                    cursor: waterIntake >= waterGoal ? 'not-allowed' : 'pointer',
                                    opacity: waterIntake >= waterGoal ? 0.4 : 1,
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { if (waterIntake < waterGoal) (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.18)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.08)'; }}
                            >
                                <Plus style={{ width: '0.75rem', height: '0.75rem', color: '#3b82f6' }} />
                                <span style={{ fontSize: '0.65rem', color: '#3b82f6', fontWeight: 600 }}>250ml</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowWater(false)}
                        style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left', transition: 'color 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg-secondary)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg-muted)'; }}
                    >
                        ← Ver refeições
                    </button>
                </div>
            )}
        </div>
    );
}