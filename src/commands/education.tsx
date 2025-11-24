import printMessagesInTerminal from '../utils/loadingMessages.tsx';
import './commands.tsx'
import type { HistoryItem } from '../types/HistoryItem'

function education(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>): void {

    const educationPrompt = [
        'école 42: tronc commun ✔️',
        '- recherche de stage pour la suite du cursus',
        '- objectif RNCP 7',
        '',
        '',
        '',
        'baccalauréat général ✔️',
        '- spécialiés : maths📐 & svt🧬',
        '- option maths expertes 🧮e = ∑∞ⁿ⁼⁰ ¹ₙ🤓',
        '- Mention Bien',
        '',
        '',
        '',
        'brevet des collèges ✔️',
        '- Mention Bien',
        '',
        '',
        ''
    ]

    printMessagesInTerminal(setHistory, educationPrompt, 10, 'education-text')
}

export default education