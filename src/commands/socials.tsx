import './commands.tsx'

function socials(setHistory: React.Dispatch<React.SetStateAction<string[]>>, history: string[]) {
    const newHistory = [...history, `> Je suis le socials`]
    setHistory(newHistory)
}

export default socials