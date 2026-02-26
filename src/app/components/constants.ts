import { WorkoutData, WorkoutType } from './types';

export const workoutConfig: Record<WorkoutType, WorkoutData> = {
    push: {
        name: 'Push',
        energyLevel: 8,
        energyLabel: 'Alta Intensidade',
        preWorkout: 'Café + Banana + Pasta de Amendoim',
        postWorkout: 'Whey Protein + Aveia',
        vibe: {
            genre: 'Rock/Metal',
            playlist: 'Heavy Hitters',
            icon: '🎸',
            color: 'from-red-500/20 to-orange-500/20'
        },
        color: 'red'
    },
    pull: {
        name: 'Pull',
        energyLevel: 7,
        energyLabel: 'Média-Alta',
        preWorkout: 'Tapioca + Frango Desfiado',
        postWorkout: 'Arroz Integral + Ovos',
        vibe: {
            genre: 'Hip-Hop/Rap',
            playlist: 'Beast Mode',
            icon: '🎤',
            color: 'from-blue-500/20 to-purple-500/20'
        },
        color: 'blue'
    },
    legs: {
        name: 'Legs',
        energyLevel: 10,
        energyLabel: 'Máximo Esforço',
        preWorkout: 'Batata Doce + Carne Vermelha',
        postWorkout: 'Whey + Creatina + Malto',
        vibe: {
            genre: 'Eletrônica',
            playlist: 'Heavy Bass',
            icon: '🎧',
            color: 'from-purple-500/20 to-pink-500/20'
        },
        color: 'purple'
    },
    rest: {
        name: 'Rest Day',
        energyLevel: 3,
        energyLabel: 'Recuperação',
        preWorkout: 'Suco Verde + Frutas',
        postWorkout: 'Refeição leve balanceada',
        vibe: {
            genre: 'Lo-fi/Ambient',
            playlist: 'Chill Vibes',
            icon: '🌿',
            color: 'from-green-500/20 to-emerald-500/20'
        },
        color: 'green'
    },
    cardio: {
        name: 'Cardio',
        energyLevel: 6,
        energyLabel: 'Médio Esforço',
        preWorkout: 'Pão Integral + Mel',
        postWorkout: 'Frutas + Iogurte',
        vibe: {
            genre: 'House/EDM',
            playlist: 'Running Beats',
            icon: '🎵',
            color: 'from-yellow-500/20 to-orange-500/20'
        },
        color: 'yellow'
    }
};

export const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];