import './commands.tsx'
import type { HistoryItem } from '../types/HistoryItem'

function clear(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>): void {
    setHistory([])
}

export default clear