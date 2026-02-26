'use client';

import { WorkoutType, WeeklyProgress } from './types';
import { workoutConfig, weekDays } from './constants';
import { Check, Target } from 'lucide-react';

interface ProgressCardProps {
    currentWorkout: WorkoutType;
    weeklyProgress: WeeklyProgress[];
    onToggleDay: (index: number) => void;
}

const workoutColors: Record<WorkoutType, string> = {
    push: '#ef4444',
    pull: '#3b82f6',
    legs: '#a855f7',
    rest: '#22c55e',
    cardio: '#eab308',
};

const workoutEmojis: Record<WorkoutType, string> = {
    push: '💪',
    pull: '🏋️',
    legs: '🦵',
    rest: '🌿',
    cardio: '🏃',
};

export function ProgressCard({ currentWorkout, weeklyProgress, onToggleDay }: ProgressCardProps) {
    const completedCount = weeklyProgress.filter(d => d.completed).length;
    const progressPercent = (completedCount / 7) * 100;
    const currentColor = workoutColors[currentWorkout];

    return (
        <div
            className="card card-hover-effect"
            style={{ transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                    padding: '0.65rem', borderRadius: '12px',
                    background: `linear-gradient(135deg, ${currentColor}20, ${currentColor}35)`,
                    border: `1px solid ${currentColor}25`,
                    transition: 'all 0.3s',
                }}>
                    <Target style={{ width: '1.125rem', height: '1.125rem', color: currentColor }} />
                </div>
                <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)', marginBottom: '0.15rem' }}>
                        Progresso Semanal
                    </p>
                    <p style={{ fontSize: '1.375rem', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                        {completedCount}
                        <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--fg-muted)' }}>/7 treinos</span>
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="energy-bar energy-bar-animated" style={{ marginBottom: '1.25rem' }}>
                <div
                    className="energy-bar-fill"
                    style={{
                        width: `${progressPercent}%`,
                        background: `linear-gradient(90deg, ${currentColor}80, ${currentColor})`,
                        transition: 'width 0.8s cubic-bezier(0.23,1,0.32,1)',
                    }}
                />
            </div>

            {/* Week circles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.375rem' }}>
                {weeklyProgress.map((day, index) => {
                    const dayColor = day.type ? workoutColors[day.type as WorkoutType] : 'rgba(255,255,255,0.1)';
                    const isToday = day.type === currentWorkout && !day.completed;

                    return (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                            <span style={{ fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
                                {weekDays[index]}
                            </span>
                            <button
                                onClick={() => onToggleDay(index)}
                                title={day.type ? `Treino: ${workoutConfig[day.type as WorkoutType]?.name}` : 'Dia sem treino'}
                                style={{
                                    width: '2.1rem', height: '2.1rem',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer',
                                    border: `1px solid ${day.completed ? 'var(--rest)' :
                                        isToday ? currentColor :
                                            day.type ? dayColor + '40' :
                                                'rgba(255,255,255,0.07)'
                                        }`,
                                    background: day.completed
                                        ? 'rgba(34,197,94,0.15)'
                                        : isToday
                                            ? `${currentColor}18`
                                            : day.type
                                                ? `${dayColor}0d`
                                                : 'rgba(255,255,255,0.03)',
                                    boxShadow: day.completed
                                        ? '0 0 10px rgba(34,197,94,0.3)'
                                        : isToday
                                            ? `0 0 10px ${currentColor}40`
                                            : 'none',
                                    transform: 'scale(1)',
                                    transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                                    fontSize: '0.75rem',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.15)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                            >
                                {day.completed
                                    ? <Check style={{ width: '0.75rem', height: '0.75rem', color: 'var(--rest)' }} />
                                    : day.type
                                        ? <span>{workoutEmojis[day.type as WorkoutType]}</span>
                                        : null
                                }
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {[
                    { color: 'var(--rest)', border: 'var(--rest)', label: 'Completo' },
                    { color: `${currentColor}18`, border: currentColor, label: 'Hoje' },
                    { color: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.15)', label: 'Agendado' },
                ].map(({ color, border, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <div style={{
                            width: '0.75rem', height: '0.75rem', borderRadius: '50%',
                            background: color, border: `1px solid ${border}`,
                        }} />
                        <span style={{ fontSize: '0.65rem', color: 'var(--fg-muted)', fontWeight: 500 }}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}