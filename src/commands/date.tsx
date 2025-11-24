import type { HistoryItem } from '../types/HistoryItem'
import printMessagesInTerminal from '../utils/loadingMessages.tsx'

function date(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>) {
    const now = new Date()
    const dateString = now.toLocaleString('fr-FR', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Paris'
    })

    const datePrompt: HistoryItem[] = [dateString]
    printMessagesInTerminal(setHistory, datePrompt, 20, 'date-text')
}

export default date
