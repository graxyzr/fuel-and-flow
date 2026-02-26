'use client';

import { useState, useEffect, useCallback } from 'react';
import { WorkoutSelector } from './components/workout-selector';
import { EnergyCard } from './components/energy-card';
import { NutritionCard } from './components/nutrition-card';
import { VibeCard } from './components/vibe-card';
import { ProgressCard } from './components/progress-card';
import { WorkoutType, WeeklyProgress } from './components/types';
import { workoutConfig, weekDays } from './components/constants';
import { Flame, Moon, Trophy, Calendar } from 'lucide-react';

export default function Home() {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType>('push');
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([]);
  const [streak, setStreak] = useState(0);

  // 🔹 CORREÇÃO: Declarar calculateStreak PRIMEIRO com useCallback
  const calculateStreak = useCallback((progress: WeeklyProgress[]) => {
    let currentStreak = 0;
    for (let i = progress.length - 1; i >= 0; i--) {
      if (progress[i].completed) currentStreak++;
      else break;
    }
    setStreak(currentStreak);
  }, []);

  // Inicializar dados de progresso
  useEffect(() => {
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1;

    const mockProgress: WeeklyProgress[] = weekDays.map((day, index) => ({
      day,
      completed: index < adjustedToday,
      type: index === 0 ? 'push' :
        index === 1 ? 'pull' :
          index === 2 ? 'legs' :
            index === 3 ? 'rest' :
              index === 4 ? 'cardio' : null
    }));
    setWeeklyProgress(mockProgress);
    calculateStreak(mockProgress);
  }, [calculateStreak]);

  const handleSelectWorkout = (workout: WorkoutType) => {
    setSelectedWorkout(workout);

    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1;

    setWeeklyProgress(prev => {
      const newProgress = prev.map((day, index) =>
        index === adjustedToday
          ? { ...day, type: workout }
          : day
      );
      return newProgress;
    });
  };

  const handleToggleDay = (index: number) => {
    setWeeklyProgress(prev => {
      const newProgress = prev.map((day, i) =>
        i === index
          ? { ...day, completed: !day.completed }
          : day
      );
      calculateStreak(newProgress);
      return newProgress;
    });
  };

  const handleResetWeek = () => {
    if (confirm('Tem certeza que deseja resetar o progresso da semana?')) {
      setWeeklyProgress(prev =>
        prev.map(day => ({ ...day, completed: false }))
      );
      setStreak(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-orange-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Fuel & Flow
              </h1>
            </div>

            <div className="flex items-center gap-6">
              {/* Streak */}
              <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-white">{streak} dias seguidos</span>
              </div>

              {/* Dark mode indicator */}
              <div className="flex items-center gap-2 text-zinc-400">
                <Moon className="w-5 h-5" />
                <span className="text-sm hidden sm:inline">Dark Mode</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Data atual */}
          <div className="flex items-center gap-2 text-zinc-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Seletor de Treino */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4">
              ⚡ Selecione seu treino de hoje
            </h2>
            <WorkoutSelector
              selectedWorkout={selectedWorkout}
              onSelectWorkout={handleSelectWorkout}
            />
          </section>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <EnergyCard workout={selectedWorkout} />
            <NutritionCard workout={selectedWorkout} />
            <VibeCard workout={selectedWorkout} />
            <ProgressCard
              currentWorkout={selectedWorkout}
              weeklyProgress={weeklyProgress}
              onToggleDay={handleToggleDay}
            />
          </div>

          {/* Ações e Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resumo do Dia */}
            <div className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20">
                  <span className="text-2xl">{workoutConfig[selectedWorkout].vibe.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">Fuel & Flow do Dia</h3>
                  <p className="text-lg text-white">
                    {workoutConfig[selectedWorkout].name} • {workoutConfig[selectedWorkout].energyLabel}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {workoutConfig[selectedWorkout].vibe.genre}
                  </p>
                </div>
              </div>
            </div>

            {/* Botão de ação */}
            <div className="bg-zinc-900/50 rounded-xl border border-white/10 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-zinc-400">Progresso</h3>
                <p className="text-2xl font-bold text-white">
                  {weeklyProgress.filter(d => d.completed).length}/7
                </p>
              </div>
              <button
                onClick={handleResetWeek}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all border border-red-500/20 hover:border-red-500/40"
              >
                Resetar Semana
              </button>
            </div>
          </div>

          {/* Dica do dia */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-sm text-blue-400">
              💡 Dica: Clique nos círculos do progresso semanal para marcar seus treinos como concluídos!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}