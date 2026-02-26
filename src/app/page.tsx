'use client';

import { useState, useEffect } from 'react';
import { WorkoutSelector } from './components/workout-selector';
import { EnergyCard } from './components/energy-card';
import { NutritionCard } from './components/nutrition-card';
import { VibeCard } from './components/vibe-card';
import { ProgressCard } from './components/progress-card';
import { WorkoutType, WeeklyProgress } from './components/types';
import { workoutConfig, weekDays } from './components/constants';
import { Flame, Moon, Trophy, Calendar, Zap, RotateCcw } from 'lucide-react';

export default function Home() {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType>('push');
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([]);
  const [streak, setStreak] = useState(0);

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
  }, []);

  const calculateStreak = (progress: WeeklyProgress[]) => {
    let currentStreak = 0;
    for (let i = progress.length - 1; i >= 0; i--) {
      if (progress[i].completed) currentStreak++;
      else break;
    }
    setStreak(currentStreak);
  };

  const handleSelectWorkout = (workout: WorkoutType) => {
    setSelectedWorkout(workout);
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1;
    setWeeklyProgress(prev =>
      prev.map((day, index) =>
        index === adjustedToday ? { ...day, type: workout } : day
      )
    );
  };

  const handleToggleDay = (index: number) => {
    setWeeklyProgress(prev => {
      const newProgress = prev.map((day, i) =>
        i === index ? { ...day, completed: !day.completed } : day
      );
      calculateStreak(newProgress);
      return newProgress;
    });
  };

  const handleResetWeek = () => {
    if (confirm('Tem certeza que deseja resetar o progresso da semana?')) {
      setWeeklyProgress(prev => prev.map(day => ({ ...day, completed: false })));
      setStreak(0);
    }
  };

  const completedDays = weeklyProgress.filter(d => d.completed).length;
  const progressPercent = Math.round((completedDays / 7) * 100);
  const config = workoutConfig[selectedWorkout];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>

      {/* ── Ambient glow blob behind content ── */}
      <div
        aria-hidden
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{
          background: `radial-gradient(ellipse at center, ${config.color ?? '#a855f7'} 0%, transparent 70%)`,
          transition: 'background 0.8s ease',
        }}
      />

      {/* ══════════ HEADER ══════════ */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(9,9,11,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(255,255,255,0.07)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-xl"
                style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.25)' }}
              >
                <Flame className="w-5 h-5" style={{ color: '#f97316' }} />
              </div>
              <h1
                className="text-xl font-bold"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: 'linear-gradient(135deg, #f97316, #ef4444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Fuel & Flow
              </h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">

              {/* Streak badge */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(234,179,8,0.1)',
                  border: '1px solid rgba(234,179,8,0.25)',
                  color: '#eab308',
                }}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>{streak} dias</span>
              </div>

              {/* Workout badge */}
              <div className={`badge badge-${selectedWorkout}`}>
                {config.name}
              </div>

              <Moon className="w-4 h-4" style={{ color: 'var(--fg-muted)' }} />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ MAIN ══════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* ── Date line ── */}
          <div className="flex items-center gap-2 animate-fade-in" style={{ color: 'var(--fg-muted)' }}>
            <Calendar className="w-4 h-4" />
            <span className="text-sm capitalize">
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          </div>

          {/* ── Workout selector ── */}
          <section className="animate-slide-up">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-4 h-4" style={{ color: '#a855f7' }} />
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--fg-secondary)' }}>
                Treino de hoje
              </h2>
            </div>
            <WorkoutSelector
              selectedWorkout={selectedWorkout}
              onSelectWorkout={handleSelectWorkout}
            />
          </section>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="animate-slide-up delay-75">
              <EnergyCard workout={selectedWorkout} />
            </div>
            <div className="animate-slide-up delay-150">
              <NutritionCard workout={selectedWorkout} />
            </div>
            <div className="animate-slide-up delay-225">
              <VibeCard workout={selectedWorkout} />
            </div>
            <div className="animate-slide-up delay-300">
              <ProgressCard
                currentWorkout={selectedWorkout}
                weeklyProgress={weeklyProgress}
                onToggleDay={handleToggleDay}
              />
            </div>
          </div>

          {/* ── Bottom row ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-slide-up delay-450">

            {/* Resumo do dia */}
            <div
              className="glass-effect p-6 flex items-center gap-5"
              style={{ transition: 'box-shadow 0.3s' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: `${config.color}18`,
                  border: `1px solid ${config.color}30`,
                  boxShadow: `0 0 20px ${config.color}20`,
                }}
              >
                {config.vibe.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--fg-muted)' }}>
                  Fuel & Flow do Dia
                </p>
                <p className="text-base font-semibold text-white truncate">
                  {config.name}
                  <span className="mx-2 opacity-30">·</span>
                  <span style={{ color: config.color }}>{config.energyLabel}</span>
                </p>
                <p className="text-sm mt-0.5 truncate" style={{ color: 'var(--fg-muted)' }}>
                  {config.vibe.genre}
                </p>
              </div>
            </div>

            {/* Progresso + reset */}
            <div className="glass-effect p-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--fg-muted)' }}>
                  Semana
                </p>

                {/* Progress bar */}
                <div className="flex items-center gap-3">
                  <div className="energy-bar w-32">
                    <div
                      className="energy-bar-fill energy-bar-fill-default"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {completedDays}
                    <span className="text-base font-normal" style={{ color: 'var(--fg-muted)' }}>/7</span>
                  </span>
                </div>
              </div>

              <button
                onClick={handleResetWeek}
                className="btn btn-ghost flex items-center gap-2 text-sm"
                style={{ color: 'var(--push)', borderColor: 'rgba(239,68,68,0.2)' }}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resetar
              </button>
            </div>
          </div>

          {/* ── Tip ── */}
          <div
            className="glass-effect-subtle px-5 py-3 flex items-center gap-3 animate-fade-in delay-600"
          >
            <span className="text-base">💡</span>
            <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
              Clique nos círculos do progresso semanal para marcar seus treinos como concluídos!
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}