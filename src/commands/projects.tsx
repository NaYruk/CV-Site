import './commands.tsx'
import type { HistoryItem } from '../types/HistoryItem'
import printMessagesInTerminal from '../utils/loadingMessages.tsx'

function projects(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>): void {

     const projectsPrompt: HistoryItem[] = [
        '',
        '',
        '',
        'Liste des projets qui m\'ont le plus apportés :',
        '',
        '',
    ]
    let delay = printMessagesInTerminal(setHistory, projectsPrompt, 5, 10, 'projects-text')

    const TICFETitle: HistoryItem[] = [
        <a key="https://github.com/TICFE-DJANGO/TICFE" href="https://github.com/TICFE-DJANGO/TICFE" target="_blank" className="projects-title">TICFE ASSIST ⚡:</a>
    ]
    delay = printMessagesInTerminal(setHistory, TICFETitle, 5, 10, 'projects-title', delay)

    const TICFEPrompt: HistoryItem[] = [
        'description: ',
        '- TICFE Assist est un projet réalisé lors du Hackathon de Bourgogne-Franche-Comté',
        'il consistait en la simplification des démarches de remboursement de TICFE (Taxe Intérieure sur la Consommation Finale d\'Électricité)',
        'pour cela, nous avons innové et proposé un rendu avec une auto-complétion d\'un des formulaires de remboursement',
        'ce qui a convaincu les jurys de l\'événement qui nous ont attribué le premier prix 🏆',
        'projet extrêmement formateur, nous n\'avions pas les connaissances des technologies',
        'mais avons tout appris lors des deux jours de développement (DJANGO, PYTHON, API, DATABASE, ...)',
        '',
        '',
    ]
    delay = printMessagesInTerminal(setHistory, TICFEPrompt, 5, 10, 'projects-text', delay)




    const MINISHELLTitle: HistoryItem[] = [
        <a key="https://github.com/NaYruk/Minishell" href="https://github.com/NaYruk/Minishell" target="_blank" className="projects-title">MINISHELL 📟 :</a>
    ]
    delay = printMessagesInTerminal(setHistory, MINISHELLTitle, 5, 10, 'projects-title', delay)

    const MINISHELLPrompt: HistoryItem[] = [
        'description: ',
        '- Minishell est un projet réalisé pour l\'école 42 lors du tronc commun',
        'nous devions recréer un Shell avec comme exemple le fonctionnement de bash',
        'projet réalisé en C',
        'très formateur notamment sur la rigueur à entretenir lors des projets en collaboration',
        '',
        '',
    ]
    delay = printMessagesInTerminal(setHistory, MINISHELLPrompt, 5, 10, 'projects-text', delay)




    const CUB3DTitle: HistoryItem[] = [
        <a key="https://github.com/SefgaultBros/Cub3D" href="https://github.com/SefgaultBros/Cub3D" target="_blank" className="projects-title">CUB3D 🪖 :</a>
    ]
    delay = printMessagesInTerminal(setHistory, CUB3DTitle, 5, 10, 'projects-title', delay)

    const CUB3DPrompt: HistoryItem[] = [
        'description: ',
        '- Cub3D est un projet réalisé pour l\'école 42 lors du tronc commun',
        'dans ce projet nous devions recréer un FPS avec la méthode du Raycasting',
        'pour cela, nous nous sommes basés sur le fonctionnement de Wolfenstein 3D et du Raycasting',
        'projet réalisé en C',
        'très formateur notamment sur les mathématiques qui peuvent être très poussées en fonction des domaines',
        '',
        '',
    ]
    delay = printMessagesInTerminal(setHistory, CUB3DPrompt, 5, 10, 'projects-text', delay)




    const FINALTitle: HistoryItem[] = [
        'Pour plus de projets, voir mon github (cmd SOCIALS)',
        '',
        '',
        '',
    ]
    printMessagesInTerminal(setHistory, FINALTitle, 5, 10, 'projects-title', delay)
}

export default projects