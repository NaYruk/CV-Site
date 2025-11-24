import './commands.tsx'
import type { HistoryItem } from '../types/HistoryItem'

function whoami(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>, history: HistoryItem[]): void {
    const newHistory = [...history, `> Je suis le whoami`]
    setHistory(newHistory)
}

export default whoami