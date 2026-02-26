import { WorkoutData, WorkoutType } from './types';

export const workoutConfig: Record<WorkoutType, WorkoutData> = {
    push: {
        name: 'Push',
        energyLevel: 8,
        energyLabel: 'Alta Intensidade',
        preWorkout: 'Café + Banana + Pasta de Amendoim',
        postWorkout: 'Whey Protein + Aveia',
        duration: 60,
        calories: 450,
        exercises: ['Supino', 'Desenvolvimento', 'Tríceps', 'Elevação Lateral'],
        vibe: {
            genre: 'Rock/Metal',
            playlist: 'Heavy Hitters',
            icon: '🎸',
            color: 'from-red-500/20 to-orange-500/20',
            songs: ['Enter Sandman - Metallica', 'Chop Suey - SOAD', 'Killing in the Name - RATM']
        },
        color: 'red'
    },
    pull: {
        name: 'Pull',
        energyLevel: 7,
        energyLabel: 'Média-Alta',
        preWorkout: 'Tapioca + Frango Desfiado',
        postWorkout: 'Arroz Integral + Ovos',
        duration: 55,
        calories: 400,
        exercises: ['Puxada', 'Remada', 'Bíceps', 'Face Pull'],
        vibe: {
            genre: 'Hip-Hop/Rap',
            playlist: 'Beast Mode',
            icon: '🎤',
            color: 'from-blue-500/20 to-purple-500/20',
            songs: ['Sicko Mode - Travis Scott', 'HUMBLE - Kendrick', 'Godzilla - Eminem']
        },
        color: 'blue'
    },
    legs: {
        name: 'Legs',
        energyLevel: 10,
        energyLabel: 'Máximo Esforço',
        preWorkout: 'Batata Doce + Carne Vermelha',
        postWorkout: 'Whey + Creatina + Malto',
        duration: 70,
        calories: 600,
        exercises: ['Agachamento', 'Leg Press', 'Cadeira Extensora', 'Stiff'],
        vibe: {
            genre: 'Eletrônica',
            playlist: 'Heavy Bass',
            icon: '🎧',
            color: 'from-purple-500/20 to-pink-500/20',
            songs: ['Animals - Martin Garrix', 'Levels - Avicii', 'Titanium - Sia']
        },
        color: 'purple'
    },
    rest: {
        name: 'Rest Day',
        energyLevel: 3,
        energyLabel: 'Recuperação',
        preWorkout: 'Suco Verde + Frutas',
        postWorkout: 'Refeição leve balanceada',
        duration: 0,
        calories: 0,
        exercises: ['Alongamento', 'Meditação', 'Foam Roller'],
        vibe: {
            genre: 'Lo-fi/Ambient',
            playlist: 'Chill Vibes',
            icon: '🌿',
            color: 'from-green-500/20 to-emerald-500/20',
            songs: ['Snowfall - Øneheart', 'Spirit Blossom - Purrple Cat', 'lofi jazz - cooki']
        },
        color: 'green'
    },
    cardio: {
        name: 'Cardio',
        energyLevel: 6,
        energyLabel: 'Médio Esforço',
        preWorkout: 'Pão Integral + Mel',
        postWorkout: 'Frutas + Iogurte',
        duration: 45,
        calories: 350,
        exercises: ['Corrida', 'Bike', 'Pular Corda', 'Natação'],
        vibe: {
            genre: 'House/EDM',
            playlist: 'Running Beats',
            icon: '🎵',
            color: 'from-yellow-500/20 to-orange-500/20',
            songs: ['Sandstorm - Darude', 'Better Off Alone - Alice', 'Blue - Eiffel 65']
        },
        color: 'yellow'
    }
};

export const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export const motivationalPhrases = [
    "O esforço de hoje é o resultado de amanhã",
    "Seu único limite é você mesmo",
    "Não pare quando estiver cansado, pare quando terminar",
    "O corpo alcança o que a mente acredita",
    "Dor temporária, orgulho eterno",
    "Você é mais forte do que pensa",
    "Cada repetição conta",
    "Transforme seu café em código e seu treino em resultado"
];