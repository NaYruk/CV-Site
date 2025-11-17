import './Terminal.css'
import { useState, useRef, useEffect } from 'react'


function Terminal() {
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const MAX_LINES = 28  // Nombre maximum de lignes d'historique

    // Remet le focus sur l'input après chaque changement
    useEffect(() => {
        inputRef.current?.focus()
    }, [history])

    // EVENT ENTER, new prompt line.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            // Limite la longueur de chaque ligne à 100 caractères
            const trimmedInput = input.slice(0, 100)
            const newHistory = [...history, `> ${trimmedInput}`]
            // Garde seulement les dernières MAX_LINES lignes
            if (newHistory.length > MAX_LINES) {
                setHistory(newHistory.slice(-MAX_LINES))
            } else {
                setHistory(newHistory)
            }
            setInput('')
        }
    }

    return (
        <div className="Monitor">
            <div className="Screen">
                <div className="Terminal">
                    <div className="output">
                        {history.map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                    <form className='InputBox' onSubmit={handleSubmit}>
                        <span>{'> '}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoFocus
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Terminal