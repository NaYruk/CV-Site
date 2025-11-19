import './commands.tsx'

function projects(setHistory: React.Dispatch<React.SetStateAction<string[]>>, history: string[]): void {
    const newHistory = [...history, `> Je suis le project`]
    setHistory(newHistory)
}

export default projects