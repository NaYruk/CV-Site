import printMessagesInTerminal from '../utils/loadingMessages.tsx'
import type { HistoryItem } from '../types/HistoryItem'

function help(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>): void {

    const helpPrompt = [
        '',
        '',
        '',
        '=== COMMANDES PRINCIPALES ===',
        'clear:      effacer le contenu du terminal',
        'socials:    réseaux où on peut me retrouver / contacter',
        'projects:   projets que j\'ai terminés',
        'whoami:     informations à mon propos',
        'education:  mon parcours scolaire',
        '',
        '',
        '',
        '',
        '=== COMMANDES UTILITAIRES ===',
        'help:       afficher cette aide',
        'date:       afficher la date et l\'heure',
        'echo:       afficher du texte (ex: echo "Bonjour")',
        'tree:       afficher la structure du portfolio',
        '',
        '',
        '',
        '',
    ]

    printMessagesInTerminal(setHistory, helpPrompt, 5, 10, 'help-text')
}

export default help