import './commands.tsx'

function whoami(setHistory: React.Dispatch<React.SetStateAction<string[]>>, history: string[]): void {
    const newHistory = [...history, `> Je suis le whoami`]
    setHistory(newHistory)
}

export default whoami