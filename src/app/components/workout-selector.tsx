'use client';

import { WorkoutType } from './types';
import { workoutConfig } from './constants';
import { Dumbbell, Heart, User, Footprints, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(Object.keys(workoutConfig) as WorkoutType[]).map((type) => {
                const workout = workoutConfig[type];
                const Icon = workoutIcons[type];
                const isSelected = selectedWorkout === type;

                return (
                    <button
                        key={type}
                        onClick={() => onSelectWorkout(type)}
                        className={cn(
                            'relative overflow-hidden rounded-xl p-4 transition-all duration-300',
                            'border border-white/10 hover:border-white/20',
                            'flex flex-col items-center gap-2 group',
                            isSelected
                                ? `bg-gradient-to-br ${workout.vibe.color} border-${workout.color}-500/50 shadow-lg shadow-${workout.color}-500/20`
                                : 'bg-zinc-900/50 hover:bg-zinc-800/50'
                        )}
                    >
                        <Icon className={cn(
                            'w-6 h-6 transition-transform group-hover:scale-110',
                            isSelected ? `text-${workout.color}-400` : 'text-zinc-400'
                        )} />
                        <span className={cn(
                            'text-sm font-medium',
                            isSelected ? `text-${workout.color}-400` : 'text-zinc-300'
                        )}>
                            {workout.name}
                        </span>
                        {isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 pointer-events-none" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}