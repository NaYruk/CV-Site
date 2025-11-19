import './commands.tsx'

function education(setHistory: React.Dispatch<React.SetStateAction<string[]>>, history: string[]): void {
    const newHistory = [...history, `> Je suis le education`]
    setHistory(newHistory)
}

export default education