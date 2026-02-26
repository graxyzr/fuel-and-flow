'use client';

import { WorkoutType, WeeklyProgress } from './types';
import { workoutConfig, weekDays } from './constants';
import { Check, Target } from 'lucide-react';

// Função cn local
function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(' ');
}

interface ProgressCardProps {
    currentWorkout: WorkoutType;
    weeklyProgress: WeeklyProgress[];
    onToggleDay: (index: number) => void;
}

export function ProgressCard({ currentWorkout, weeklyProgress, onToggleDay }: ProgressCardProps) {
    const completedCount = weeklyProgress.filter(day => day.completed).length;
    const progressPercentage = (completedCount / 7) * 100;

    return (
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-zinc-400">Progresso Semanal</h3>
                    <p className="text-2xl font-bold text-white">{completedCount}/7 treinos</p>
                </div>
            </div>

            <div className="mb-4">
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {weeklyProgress.map((day, index) => {
                    // Determinar classes manualmente
                    let circleClasses = "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 ";

                    if (day.completed) {
                        circleClasses += "bg-green-500/20 text-green-400 border border-green-500/50";
                    } else if (day.type === currentWorkout) {
                        circleClasses += `bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20`;
                    } else if (day.type) {
                        circleClasses += "bg-zinc-700/50 border border-white/10";
                    } else {
                        circleClasses += "bg-zinc-800/50 border border-white/5";
                    }

                    return (
                        <div key={index} className="flex flex-col items-center">
                            <span className="text-xs text-zinc-500 mb-1">{weekDays[index]}</span>
                            <div
                                className={circleClasses}
                                onClick={() => onToggleDay(index)}
                                title={day.type ? `Treino: ${workoutConfig[day.type]?.name}` : 'Dia sem treino'}
                            >
                                {day.completed ? (
                                    <Check className="w-4 h-4" />
                                ) : day.type ? (
                                    <span className="text-xs">
                                        {day.type === 'rest' ? '🌿' :
                                            day.type === 'push' ? '💪' :
                                                day.type === 'pull' ? '🏋️' :
                                                    day.type === 'legs' ? '🦵' : '🏃'}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legenda */}
            <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                        <span className="text-zinc-400">Completo</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20"></div>
                        <span className="text-zinc-400">Hoje</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-zinc-700/50 border border-white/10"></div>
                        <span className="text-zinc-400">Agendado</span>
                    </div>
                </div>
            </div>
        </div>
    );
}