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

export function WorkoutSelector({ selectedWorkout, onSelectWorkout }: WorkoutSelectorProps) {
    const [hoveredWorkout, setHoveredWorkout] = useState<WorkoutType | null>(null);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {(Object.keys(workoutConfig) as WorkoutType[]).map((type) => {
                    const workout = workoutConfig[type];
                    const Icon = workoutIcons[type];
                    const isSelected = selectedWorkout === type;
                    const isHovered = hoveredWorkout === type;

                    return (
                        <button
                            key={type}
                            onClick={() => onSelectWorkout(type)}
                            onMouseEnter={() => setHoveredWorkout(type)}
                            onMouseLeave={() => setHoveredWorkout(null)}
                            className={`
                relative overflow-hidden rounded-xl p-4 transition-all duration-300
                border border-white/10 hover:border-white/20
                flex flex-col items-center gap-2 group
                ${isSelected ? `bg-gradient-to-br ${workout.vibe.color} shadow-lg` : 'bg-zinc-900/50 hover:bg-zinc-800/50'}
                ${isHovered ? 'scale-105' : ''}
              `}
                        >
                            {/* Efeito de brilho no hover */}
                            {isHovered && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                            )}

                            <Icon className={`
                w-6 h-6 transition-all duration-300
                ${isSelected ? `text-${workout.color}-400` : 'text-zinc-400 group-hover:text-white'}
                ${isHovered ? 'scale-110 rotate-12' : ''}
              `} />

                            <span className={`
                text-sm font-medium transition-colors
                ${isSelected ? `text-${workout.color}-400` : 'text-zinc-300'}
              `}>
                                {workout.name}
                            </span>

                            {/* Duração em tooltip - com verificação opcional */}
                            {workout.duration && workout.duration > 0 && (
                                <span className="text-xs text-zinc-500">
                                    {workout.duration}min
                                </span>
                            )}

                            {/* Indicador de seleção */}
                            {isSelected && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Dica do treino selecionado - com verificações opcionais */}
            {selectedWorkout && (
                <div className={`
          p-3 rounded-lg bg-gradient-to-r ${workoutConfig[selectedWorkout].vibe.color} 
          border border-white/10 animate-fadeIn
        `}>
                    <div className="flex items-center gap-2 text-sm">
                        <Info className="w-4 h-4 text-white/70" />
                        <span className="text-white/90">
                            {workoutConfig[selectedWorkout].exercises?.length || 0} exercícios •
                            {workoutConfig[selectedWorkout].calories || 0} kcal estimados
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}