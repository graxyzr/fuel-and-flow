export type WorkoutType = 'push' | 'pull' | 'legs' | 'rest' | 'cardio';

export interface WorkoutData {
    name: string;
    energyLevel: number;
    energyLabel: string;
    preWorkout: string;
    postWorkout: string;
    vibe: {
        genre: string;
        playlist: string;
        icon: string;
        color: string;
        songs?: string[];
    };
    color: string;
    exercises?: string[];
    duration?: number;
    calories?: number;
}

export interface WeeklyProgress {
    day: string;
    completed: boolean;
    type: WorkoutType | null;
    notes?: string;
    rating?: number;
}

export interface UserStats {
    totalWorkouts: number;
    currentStreak: number;
    bestStreak: number;
    totalCalories: number;
    favoriteWorkout: WorkoutType;
}