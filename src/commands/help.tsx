import './commands.tsx'

function help(setHistory: React.Dispatch<React.SetStateAction<string[]>>, history: string[]): void {
    const newHistory = [...history, `> Je suis le help`]
    setHistory(newHistory)
}

export default help