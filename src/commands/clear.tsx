import './commands.tsx'

function clear(setHistory: React.Dispatch<React.SetStateAction<string[]>>): void {
    setHistory([])
}

export default clear