import './commands.tsx'
import type { HistoryItem } from '../types/HistoryItem'
import printMessagesInTerminal from '../utils/loadingMessages.tsx'

function whoami(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>): void {
    const whoamiPrompt: HistoryItem[] = [
        'Je suis Milliot Marc étudiant à l\'école 42 de Mulhouse.',
        'Développeur junior en devenir avec des compétences en C, C++, JavaScript',
        'et développement web (HTML, CSS, React).',
        'Passionné par l’apprentissage, l’expérimentation et la création de projets concrets.',
        'Ouvert à tout type de stage ou alternance dans',
        'le développement (web, logiciel, front/back/full-stack).'
    ]
    printMessagesInTerminal(setHistory, whoamiPrompt, 5, 10, 'whoami-text')
}

export default whoami