import type { HistoryItem } from '../types/HistoryItem'
import printMessagesInTerminal from '../utils/loadingMessages.tsx'

function tree(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>) {
    const treePrompt: HistoryItem[] = [
        '.',
        '├── TICFE ASSIST ⚡',
        '│   ├── Hackathon project',
        '│   └── Django, Python, API',
        '├── MINISHELL 📟',
        '│   ├── School 42 project',
        '│   └── C, Bash implementation',
        '├── CUB3D 🪖',
        '│   ├── School 42 project',
        '│   └── C, Raycasting, 3D',
        '├── socials/',
        '│   ├── github',
        '│   ├── linkedin',
        '│   └── instagram',
        '├── education/',
        '├── projects/',
        '└── README.md',
    ]

    printMessagesInTerminal(setHistory, treePrompt, 15, 10,   'tree-text')
}

export default tree
