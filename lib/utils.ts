import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes CSS de forma inteligente, resolvendo conflitos do Tailwind
 * @param inputs - Classes CSS ou condicionais
 * @returns String com classes combinadas
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formata data para o formato brasileiro
 * @param date - Data a ser formatada
 * @returns String no formato dd/mm/aaaa
 */
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(date);
}

/**
 * Retorna saudação baseada no horário
 * @returns String com saudação apropriada
 */
export function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
}