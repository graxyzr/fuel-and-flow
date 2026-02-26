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
    };
    color: string;
}

export interface WeeklyProgress {
    day: string;
    completed: boolean;
    type: WorkoutType | null;
}