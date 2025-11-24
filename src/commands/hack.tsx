import type { HistoryItem } from '../types/HistoryItem'

function hack(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>) {
    const hackMessages = [
        '> Initializing system intrusion...',
        '> Bypassing firewall...',
        '[████░░░░░░░░░░░░░░] 20%',
        '[████████░░░░░░░░░░] 40%',
        '[██████████░░░░░░░░] 60%',
        '[████████████░░░░░░] 80%',
        '[████████████████░░] 95%',
        '[████████████████████] 100%',
        '> Access granted!',
        '> System compromised',
        '> Extracting data...',
        '> WARNING: Hacking detected! 🚨',
    ]

    setHistory(prev => [...prev, ''])

    hackMessages.forEach((msg, index) => {
        setTimeout(() => {
            setHistory(prev => [...prev, { text: msg, className: 'hack-text' }])
        }, index * 300)
    })
}

export default hack
