import type { HistoryItem } from '../types/HistoryItem'
import printMessagesInTerminal from '../utils/loadingMessages.tsx'

function echo(input: string, setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>) {
    // Extract text after "echo "
    const echoText = input.slice(5).trim()

    // If no text provided, show empty line
    if (!echoText) {
        setHistory(prev => [...prev, ''])
        return
    }

    const echoPrompt: HistoryItem[] = [echoText]
    printMessagesInTerminal(setHistory, echoPrompt, 20, 'echo-text')
}

export default echo
