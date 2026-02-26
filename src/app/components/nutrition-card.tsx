'use client';

import { WorkoutType } from './types';
import { workoutConfig } from './constants';
import { Utensils, Sunrise, Sunset, Plus, Check, Coffee, Apple, Droplet } from 'lucide-react';
import { useState } from 'react';

interface NutritionCardProps {
    workout: WorkoutType;
}

export function NutritionCard({ workout }: NutritionCardProps) {
    const data = workoutConfig[workout];
    const [preChecked, setPreChecked] = useState(false);
    const [postChecked, setPostChecked] = useState(false);
    const [showWaterTracker, setShowWaterTracker] = useState(false);
    const [waterIntake, setWaterIntake] = useState(0);
    const waterGoal = 2000; // ml

    const colorMap = {
        red: '#ef4444',
        blue: '#3b82f6',
        green: '#22c55e',
        purple: '#a855f7',
        yellow: '#eab308',
    };
    const colorValue = colorMap[data.color as keyof typeof colorMap] || '#ffffff';

    const handleAddWater = () => {
        setWaterIntake(prev => Math.min(prev + 250, waterGoal));
    };

    const waterPercentage = (waterIntake / waterGoal) * 100;

    return (
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="p-3 rounded-lg transition-all"
                        style={{ background: `${colorValue}20` }}
                    >
                        <Utensils className="w-5 h-5" style={{ color: colorValue }} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Fuel</h3>
                </div>

                {/* Botão do tracker de água */}
                <button
                    onClick={() => setShowWaterTracker(!showWaterTracker)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                    <Droplet className="w-4 h-4 text-blue-400" />
                </button>
            </div>

            {!showWaterTracker ? (
                <>
                    <div className="space-y-4">
                        {/* Pré-treino com checkbox */}
                        <div className="flex items-start gap-3">
                            <button
                                onClick={() => setPreChecked(!preChecked)}
                                className={`
                  mt-1 w-5 h-5 rounded flex items-center justify-center transition-all
                  ${preChecked ? 'bg-green-500' : 'bg-white/5 border border-white/10'}
                `}
                            >
                                {preChecked && <Check className="w-3 h-3 text-white" />}
                            </button>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <Sunrise className="w-4 h-4" style={{ color: colorValue }} />
                                    <p className="text-sm text-zinc-400">Pré-treino</p>
                                </div>
                                <p className={`text-white font-medium transition-all ${preChecked ? 'line-through text-zinc-500' : ''}`}>
                                    {data.preWorkout}
                                </p>
                            </div>
                        </div>

                        {/* Pós-treino com checkbox */}
                        <div className="flex items-start gap-3">
                            <button
                                onClick={() => setPostChecked(!postChecked)}
                                className={`
                  mt-1 w-5 h-5 rounded flex items-center justify-center transition-all
                  ${postChecked ? 'bg-green-500' : 'bg-white/5 border border-white/10'}
                `}
                            >
                                {postChecked && <Check className="w-3 h-3 text-white" />}
                            </button>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <Sunset className="w-4 h-4" style={{ color: colorValue }} />
                                    <p className="text-sm text-zinc-400">Pós-treino</p>
                                </div>
                                <p className={`text-white font-medium transition-all ${postChecked ? 'line-through text-zinc-500' : ''}`}>
                                    {data.postWorkout}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progresso das refeições */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs text-zinc-400">
                            <span>Progresso do dia</span>
                            <span>{preChecked && postChecked ? '100%' : preChecked || postChecked ? '50%' : '0%'}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full mt-1">
                            <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                    width: `${(preChecked ? 50 : 0) + (postChecked ? 50 : 0)}%`,
                                    background: `linear-gradient(to right, ${colorValue}, ${colorValue}dd)`
                                }}
                            />
                        </div>
                    </div>
                </>
            ) : (
                /* Tracker de água */
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Coffee className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-zinc-300">Hidratação</span>
                        </div>
                        <span className="text-sm text-white">{waterIntake}ml / {waterGoal}ml</span>
                    </div>

                    {/* Barra de progresso da água */}
                    <div className="h-2 bg-blue-500/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${waterPercentage}%` }}
                        />
                    </div>

                    {/* Botões para adicionar água */}
                    <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <button
                                key={i}
                                onClick={handleAddWater}
                                className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors text-center"
                                disabled={waterIntake >= waterGoal}
                            >
                                <Plus className="w-3 h-3 mx-auto text-blue-400" />
                                <span className="text-xs text-blue-400">250ml</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowWaterTracker(false)}
                        className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
                    >
                        ← Voltar para refeições
                    </button>
                </div>
            )}
        </div>
    );
}