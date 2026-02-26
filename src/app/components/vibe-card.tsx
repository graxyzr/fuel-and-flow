'use client';

import { WorkoutType } from './types';
import { workoutConfig } from './constants';
import { Music, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VibeCardProps {
    workout: WorkoutType;
}

export function VibeCard({ workout }: VibeCardProps) {
    const data = workoutConfig[workout];

    return (
        <div className={cn(
            'bg-gradient-to-br rounded-xl border border-white/10 p-6',
            'hover:border-white/20 transition-all',
            data.vibe.color
        )}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-black/20 backdrop-blur-sm">
                        <Music className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Vibe-Hub</h3>
                </div>
                <span className="text-2xl">{data.vibe.icon}</span>
            </div>

            <div className="space-y-3">
                <div>
                    <p className="text-sm text-white/60">Gênero Sugerido</p>
                    <p className="text-xl font-bold text-white">{data.vibe.genre}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-black/20 backdrop-blur-sm rounded-lg">
                    <div className="flex items-center gap-2">
                        <Play className={cn(
                            'w-4 h-4',
                            `text-${data.color}-400`
                        )} />
                        <span className="text-white/90">{data.vibe.playlist}</span>
                    </div>
                    <span className="text-xs text-white/40">Now Playing</span>
                </div>
            </div>
        </div>
    );
}