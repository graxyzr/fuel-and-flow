'use client';

import { WorkoutType } from './types';
import { workoutConfig } from './constants';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VibeCardProps {
    workout: WorkoutType;
}

export function VibeCard({ workout }: VibeCardProps) {
    const data = workoutConfig[workout];
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [volume, setVolume] = useState(70);
    const [showPlaylist, setShowPlaylist] = useState(false);

    // Garantir que songs existe
    const songs = data.vibe.songs || [
        'Música 1 - Artista',
        'Música 2 - Artista',
        'Música 3 - Artista'
    ];

    // Simular mudança de música quando o treino muda
    useEffect(() => {
        setCurrentSongIndex(0);
        setIsPlaying(false);
    }, [workout]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    };

    const handlePrev = () => {
        setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    };

    const colorMap = {
        red: '#ef4444',
        blue: '#3b82f6',
        green: '#22c55e',
        purple: '#a855f7',
        yellow: '#eab308',
    };
    const colorValue = colorMap[data.color as keyof typeof colorMap] || '#ffffff';

    return (
        <div className={`
      bg-gradient-to-br rounded-xl border border-white/10 p-6
      hover:border-white/20 transition-all duration-300
      ${data.vibe.color} relative overflow-hidden
      ${isPlaying ? 'animate-pulse-glow' : ''}
    `}>
            {/* Efeito de ondas sonoras quando tocando */}
            {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div
                                key={i}
                                className="w-1 bg-white rounded-full animate-soundwave"
                                style={{ animationDelay: `${i * 0.1}s`, height: `${20 + i * 10}px` }}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-black/20 backdrop-blur-sm">
                            <Music className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Vibe-Hub</h3>
                    </div>
                    <button
                        onClick={() => setShowPlaylist(!showPlaylist)}
                        className="text-2xl hover:scale-110 transition-transform"
                    >
                        {data.vibe.icon}
                    </button>
                </div>

                {!showPlaylist ? (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-white/60">Gênero Sugerido</p>
                            <p className="text-xl font-bold text-white">{data.vibe.genre}</p>
                        </div>

                        {/* Player de música interativo */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-black/20 backdrop-blur-sm rounded-lg">
                                <div className="flex items-center gap-2 flex-1">
                                    {isPlaying ? (
                                        <Pause
                                            className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                                            style={{ color: colorValue }}
                                            onClick={handlePlayPause}
                                        />
                                    ) : (
                                        <Play
                                            className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                                            style={{ color: colorValue }}
                                            onClick={handlePlayPause}
                                        />
                                    )}
                                    <div className="flex-1">
                                        <p className="text-sm text-white font-medium truncate">
                                            {songs[currentSongIndex]}
                                        </p>
                                        <p className="text-xs text-white/40">Playlist: {data.vibe.playlist}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Controles do player */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <SkipBack
                                        className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors"
                                        onClick={handlePrev}
                                    />
                                    <SkipForward
                                        className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors"
                                        onClick={handleNext}
                                    />
                                </div>

                                {/* Controle de volume */}
                                <div className="flex items-center gap-2">
                                    <Volume2 className="w-3 h-3 text-white/40" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        onChange={(e) => setVolume(Number(e.target.value))}
                                        className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, ${colorValue} ${volume}%, rgba(255,255,255,0.2) ${volume}%)`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Playlist expandida */
                    <div className="space-y-2">
                        <p className="text-sm text-white/60 mb-3">Playlist: {data.vibe.playlist}</p>
                        {songs.map((song, index) => (
                            <div
                                key={index}
                                className={`
                  flex items-center justify-between p-2 rounded-lg cursor-pointer
                  transition-all hover:bg-black/20
                  ${index === currentSongIndex ? 'bg-black/30' : ''}
                `}
                                onClick={() => {
                                    setCurrentSongIndex(index);
                                    setIsPlaying(true);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    {index === currentSongIndex && isPlaying ? (
                                        <Pause className="w-3 h-3" style={{ color: colorValue }} />
                                    ) : (
                                        <Play className="w-3 h-3 text-white/40" />
                                    )}
                                    <span className="text-sm text-white/80">{song}</span>
                                </div>
                                {index === currentSongIndex && (
                                    <span className="text-xs text-white/40">Tocando</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Botão para alternar visualização */}
                <button
                    onClick={() => setShowPlaylist(!showPlaylist)}
                    className="mt-3 text-xs text-white/40 hover:text-white/60 transition-colors"
                >
                    {showPlaylist ? '⇧ Ver player' : '⇩ Ver playlist completa'}
                </button>
            </div>
        </div>
    );
}