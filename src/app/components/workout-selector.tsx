'use client';

import { WorkoutType } from './types';
import { workoutConfig } from './constants';
import { Dumbbell, Heart, User, Footprints, Coffee, Info } from 'lucide-react';
import { useState } from 'react';

interface WorkoutSelectorProps {
    selectedWorkout: WorkoutType;
    onSelectWorkout: (workout: WorkoutType) => void;
}

const workoutIcons = {
    push: Dumbbell,
    pull: User,
    legs: Footprints,
    rest: Coffee,
    cardio: Heart,
};

// Cores diretas para cada treino (evita purge do Tailwind em classes dinâmicas)
const workoutColors: Record<WorkoutType, string> = {
    push: '#ef4444',
    pull: '#3b82f6',
    legs: '#a855f7',
    rest: '#22c55e',
    cardio: '#eab308',
};

const workoutGlows: Record<WorkoutType, string> = {
    push: 'rgba(239,68,68,0.35)',
    pull: 'rgba(59,130,246,0.35)',
    legs: 'rgba(168,85,247,0.35)',
    rest: 'rgba(34,197,94,0.35)',
    cardio: 'rgba(234,179,8,0.35)',
};

export function WorkoutSelector({ selectedWorkout, onSelectWorkout }: WorkoutSelectorProps) {
    const [hoveredWorkout, setHoveredWorkout] = useState<WorkoutType | null>(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {(Object.keys(workoutConfig) as WorkoutType[]).map((type) => {
                    const workout = workoutConfig[type];
                    const Icon = workoutIcons[type];
                    const isSelected = selectedWorkout === type;
                    const color = workoutColors[type];
                    const glow = workoutGlows[type];

                    return (
                        <button
                            key={type}
                            onClick={() => onSelectWorkout(type)}
                            onMouseEnter={() => setHoveredWorkout(type)}
                            onMouseLeave={() => setHoveredWorkout(null)}
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '14px',
                                padding: '1.1rem 0.75rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                border: `1px solid ${isSelected ? color + '60' : 'rgba(255,255,255,0.07)'}`,
                                background: isSelected
                                    ? `linear-gradient(135deg, ${color}22 0%, ${color}12 100%)`
                                    : 'rgba(24,24,27,0.6)',
                                boxShadow: isSelected
                                    ? `0 0 24px ${glow}, 0 4px 16px rgba(0,0,0,0.4)`
                                    : '0 2px 8px rgba(0,0,0,0.3)',
                                transform: hoveredWorkout === type ? 'translateY(-3px) scale(1.03)' : 'scale(1)',
                                transition: 'all 0.25s cubic-bezier(0.23,1,0.32,1)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            {/* Shimmer on hover */}
                            {hoveredWorkout === type && (
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 1.2s linear infinite',
                                }} />
                            )}

                            {/* Icon */}
                            <div style={{
                                padding: '0.5rem',
                                borderRadius: '10px',
                                background: isSelected ? `${color}25` : 'rgba(255,255,255,0.05)',
                                transition: 'all 0.25s',
                                transform: hoveredWorkout === type ? 'scale(1.15) rotate(8deg)' : 'scale(1)',
                            }}>
                                <Icon
                                    style={{
                                        width: '1.25rem',
                                        height: '1.25rem',
                                        color: isSelected ? color : 'rgba(255,255,255,0.5)',
                                        transition: 'color 0.25s',
                                    }}
                                />
                            </div>

                            {/* Label */}
                            <span style={{
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                color: isSelected ? color : 'rgba(255,255,255,0.6)',
                                transition: 'color 0.25s',
                                letterSpacing: '0.01em',
                            }}>
                                {workout.name}
                            </span>

                            {/* Duration */}
                            {workout.duration && workout.duration > 0 && (
                                <span style={{
                                    fontSize: '0.7rem',
                                    color: 'rgba(255,255,255,0.3)',
                                    fontVariantNumeric: 'tabular-nums',
                                }}>
                                    {workout.duration}min
                                </span>
                            )}

                            {/* Selected bottom bar */}
                            {isSelected && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '20%',
                                    right: '20%',
                                    height: '2px',
                                    borderRadius: '9999px',
                                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                                    filter: `drop-shadow(0 0 4px ${color})`,
                                }} />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Info bar */}
            {selectedWorkout && (
                <div
                    className="animate-fade-in"
                    style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${workoutColors[selectedWorkout]}12, ${workoutColors[selectedWorkout]}06)`,
                        border: `1px solid ${workoutColors[selectedWorkout]}25`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                    }}
                >
                    <Info style={{ width: '1rem', height: '1rem', color: workoutColors[selectedWorkout], flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)' }}>
                        <strong style={{ color: workoutColors[selectedWorkout] }}>
                            {workoutConfig[selectedWorkout].exercises?.length || 0} exercícios
                        </strong>
                        {' '}•{' '}
                        <strong style={{ color: workoutColors[selectedWorkout] }}>
                            {workoutConfig[selectedWorkout].calories || 0} kcal
                        </strong>
                        {' '}estimados
                    </span>
                </div>
            )}
        </div>
    );
}