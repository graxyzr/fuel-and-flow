'use client';

import { WorkoutType } from './types';
import { workoutConfig } from './constants';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VibeCardProps {
    workout: WorkoutType;
}

const colorMap: Record<string, string> = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#22c55e',
    purple: '#a855f7',
    yellow: '#eab308',
};

const vibeGradients: Record<WorkoutType, string> = {
    push: 'linear-gradient(135deg, #1c0000 0%, #450a0a 60%, #7f1d1d 100%)',
    pull: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%)',
    legs: 'linear-gradient(135deg, #0a0018 0%, #2e1065 60%, #4c1d95 100%)',
    rest: 'linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)',
    cardio: 'linear-gradient(135deg, #1c1400 0%, #431a00 60%, #713f12 100%)',
};

export function VibeCard({ workout }: VibeCardProps) {
    const data = workoutConfig[workout];
    const color = colorMap[data.color as keyof typeof colorMap] ?? '#a855f7';
    const [isPlaying, setIsPlaying] = useState(false);
    const [songIndex, setSongIndex] = useState(0);
    const [volume, setVolume] = useState(70);
    const [showPlaylist, setShowPlaylist] = useState(false);

    const songs = data.vibe.songs || ['Track 1 - Artist', 'Track 2 - Artist', 'Track 3 - Artist'];

    useEffect(() => { setSongIndex(0); setIsPlaying(false); }, [workout]);

    return (
        <div
            className="card"
            style={{
                background: vibeGradients[workout],
                border: `1px solid ${color}25`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s, border-color 0.3s',
                boxShadow: isPlaying ? `0 0 32px ${color}30, 0 4px 16px rgba(0,0,0,0.6)` : '0 2px 8px rgba(0,0,0,0.5)',
            }}
        >
            {/* Soundwave background when playing */}
            {isPlaying && (
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0.07, pointerEvents: 'none',
                }}>
                    <div className="soundwave" style={{ height: '80px', gap: '4px' }}>
                        {[40, 70, 100, 60, 85, 50, 75].map((h, i) => (
                            <div
                                key={i}
                                className="soundwave-bar"
                                style={{
                                    width: '5px',
                                    height: `${h}%`,
                                    background: color,
                                    animationDelay: `${i * 0.1}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            padding: '0.65rem', borderRadius: '12px',
                            background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)',
                            border: `1px solid ${color}30`,
                        }}>
                            <Music style={{ width: '1.125rem', height: '1.125rem', color }} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.15rem' }}>
                                Ambiente
                            </p>
                            <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>Vibe-Hub</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowPlaylist(v => !v)}
                        style={{
                            fontSize: '1.5rem', cursor: 'pointer', background: 'none', border: 'none',
                            transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                            transform: showPlaylist ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
                        }}
                    >
                        {data.vibe.icon}
                    </button>
                </div>

                {!showPlaylist ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Genre */}
                        <div>
                            <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
                                Gênero Sugerido
                            </p>
                            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{data.vibe.genre}</p>
                        </div>

                        {/* Now playing */}
                        <div style={{
                            padding: '0.75rem',
                            borderRadius: '12px',
                            background: 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(12px)',
                            border: `1px solid ${color}20`,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
                                {/* Play/Pause button */}
                                <button
                                    onClick={() => setIsPlaying(v => !v)}
                                    style={{
                                        width: '2rem', height: '2rem',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: color,
                                        border: 'none', cursor: 'pointer', flexShrink: 0,
                                        boxShadow: `0 0 14px ${color}60`,
                                        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.12)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                                >
                                    {isPlaying
                                        ? <Pause style={{ width: '0.875rem', height: '0.875rem', color: '#fff' }} />
                                        : <Play style={{ width: '0.875rem', height: '0.875rem', color: '#fff', marginLeft: '1px' }} />
                                    }
                                </button>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {songs[songIndex]}
                                    </p>
                                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.1rem' }}>
                                        {data.vibe.playlist}
                                    </p>
                                </div>

                                {/* Soundwave indicator */}
                                {isPlaying && (
                                    <div className="soundwave" style={{ color, height: '16px' }}>
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="soundwave-bar" style={{ height: '100%', animationDelay: `${i * 0.15}s` }} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Controls */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <SkipBack
                                        onClick={() => setSongIndex(p => (p - 1 + songs.length) % songs.length)}
                                        style={{ width: '1rem', height: '1rem', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }}
                                        onMouseEnter={e => { (e.currentTarget as SVGElement).style.color = '#fff'; }}
                                        onMouseLeave={e => { (e.currentTarget as SVGElement).style.color = 'rgba(255,255,255,0.5)'; }}
                                    />
                                    <SkipForward
                                        onClick={() => setSongIndex(p => (p + 1) % songs.length)}
                                        style={{ width: '1rem', height: '1rem', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }}
                                        onMouseEnter={e => { (e.currentTarget as SVGElement).style.color = '#fff'; }}
                                        onMouseLeave={e => { (e.currentTarget as SVGElement).style.color = 'rgba(255,255,255,0.5)'; }}
                                    />
                                </div>

                                {/* Volume */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Volume2 style={{ width: '0.75rem', height: '0.75rem', color: 'rgba(255,255,255,0.3)' }} />
                                    <input
                                        type="range" min="0" max="100" value={volume}
                                        onChange={e => setVolume(Number(e.target.value))}
                                        style={{
                                            width: '4rem',
                                            background: `linear-gradient(to right, ${color} ${volume}%, rgba(255,255,255,0.15) ${volume}%)`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Playlist */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
                            {data.vibe.playlist}
                        </p>
                        {songs.map((song, i) => (
                            <div
                                key={i}
                                onClick={() => { setSongIndex(i); setIsPlaying(true); }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '0.5rem 0.625rem',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    background: i === songIndex ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.15)',
                                    border: `1px solid ${i === songIndex ? color + '35' : 'transparent'}`,
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { if (i !== songIndex) (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.25)'; }}
                                onMouseLeave={e => { if (i !== songIndex) (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.15)'; }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {i === songIndex && isPlaying
                                        ? <Pause style={{ width: '0.75rem', height: '0.75rem', color }} />
                                        : <Play style={{ width: '0.75rem', height: '0.75rem', color: 'rgba(255,255,255,0.35)' }} />
                                    }
                                    <span style={{ fontSize: '0.8125rem', color: i === songIndex ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: i === songIndex ? 600 : 400 }}>
                                        {song}
                                    </span>
                                </div>
                                {i === songIndex && (
                                    <span style={{ fontSize: '0.65rem', color, fontWeight: 600 }}>● tocando</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => setShowPlaylist(v => !v)}
                    style={{
                        marginTop: '0.875rem', fontSize: '0.7rem',
                        color: 'rgba(255,255,255,0.35)', cursor: 'pointer',
                        background: 'none', border: 'none', transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
                >
                    {showPlaylist ? '⇧ Ver player' : '⇩ Ver playlist completa'}
                </button>
            </div>
        </div>
    );
}