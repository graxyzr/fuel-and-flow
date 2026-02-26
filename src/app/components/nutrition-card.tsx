'use client';

import { WorkoutType } from './types';
import { workoutConfig } from './constants';
import { Utensils, Sunrise, Sunset } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NutritionCardProps {
    workout: WorkoutType;
}

export function NutritionCard({ workout }: NutritionCardProps) {
    const data = workoutConfig[workout];

    return (
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                    'p-3 rounded-lg bg-gradient-to-br',
                    data.vibe.color
                )}>
                    <Utensils className={cn(
                        'w-5 h-5',
                        `text-${data.color}-400`
                    )} />
                </div>
                <h3 className="text-lg font-semibold text-white">Fuel</h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className={cn(
                        'p-2 rounded-lg',
                        `bg-${data.color}-500/20`
                    )}>
                        <Sunrise className={cn(
                            'w-4 h-4',
                            `text-${data.color}-400`
                        )} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-zinc-400">Pré-treino</p>
                        <p className="text-white font-medium">{data.preWorkout}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className={cn(
                        'p-2 rounded-lg',
                        `bg-${data.color}-500/20`
                    )}>
                        <Sunset className={cn(
                            'w-4 h-4',
                            `text-${data.color}-400`
                        )} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-zinc-400">Pós-treino</p>
                        <p className="text-white font-medium">{data.postWorkout}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}