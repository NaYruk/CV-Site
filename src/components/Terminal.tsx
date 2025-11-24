import './Terminal.css'
import '../commands/commands.css';
import '../commands/commands.tsx'
import { useState, useRef, useEffect } from 'react'
import handleCommands from '../commands/commands.tsx'
import clear from '../commands/clear.tsx'
import printMessagesInTerminal from '../utils/loadingMessages.tsx'
import type { HistoryItem } from '../types/HistoryItem'

function Terminal() {
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const inputRef = useRef<HTMLInputElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)

    // Remet le focus sur l'input après chaque changement
    let firstPageLoad = false
    useEffect(() => {
        inputRef.current?.focus()
        firstPageLoad = true
    }, [history, firstPageLoad === false])

    // Permet de garder le focus sur l'input malgrer le fait de cliquer a cote
    useEffect(() => {
        const handleClick = () => {
            inputRef.current?.focus()
        }
        const terminal = terminalRef.current
        if (terminal) {
            terminal.addEventListener('click', handleClick)
            return () => terminal.removeEventListener('click', handleClick)
        }
    }) 




    // Messages de chargement au démarrage
    useEffect(() => {
        const loadingMessages = [
            'SECURITY RESET..........',
            /*'....................',
            '.............',
            '.',
            '.',
            'OK.',
            'LOADING TERMINAL....',
            '....................',
            '........',
            '.',
            '.',
            'OK.',
            '...',
            'CONFIDENTIAL INFORMATION DETECT',
            '..........',
            'PROTECTED INFORMATION IN PROGRESS',
            '...............',
            '.',
            '.',
            '.',
            'OK.',
            '',
            '',
            '',
            'WELCOME TO THE BEAUTIFUL INTERACTIF CV TERMINAL'*/
        ]

        const totalDelay = printMessagesInTerminal(setHistory, loadingMessages, 50)

        setTimeout(() => {
            setIsLoading(false)
            clear(setHistory)
        }, totalDelay + 500)

    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ne pas jouer de sons pendant le chargement
            if (isLoading) return;

            // Ignorer les répétitions quand on reste appuyé
            if (e.repeat) return;

            // Son différent pour la barre d'espace
            let soundFile = "/sounds/WriteSound.mp3"
            if (e.key === ' ' || e.code === 'Space') {
                soundFile = "/sounds/SpaceSound.mp3"
            }
            else if (e.code === 'Enter') {
                soundFile = "./sounds/DeleteTouch.mp3"
            }

            const sound = new Audio(soundFile);
            sound.currentTime = 0;
            sound.play().catch(err => console.log("Audio play error:", err));
        }
        window.addEventListener("keydown", handleKeyDown);

        // Nettoyage quand le composant est démonté
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isLoading])


    // Fonction wrapper pour setHistory
    const setHistoryWithLimit = (newHistory: HistoryItem[] | ((prev: HistoryItem[]) => HistoryItem[])) => {
        setHistory(newHistory)
    }


    // EVENT ENTER, new prompt line.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            // Ajouter la commande/input à l'historique
            setHistory(prev => [...prev, `> ${input}`])

            // Puis exécuter la commande avec le wrapper
            setIsLoading(true)
            handleCommands(input, setHistoryWithLimit, history)
            setIsLoading(false)
            setInput('')
        }
    }

    return (
        <div className="Monitor">
            <div className="Screen">
                <div className="Terminal" ref={terminalRef}>
                    <div className="scanline"></div>
                    <div className="output">
                        {history.map((line, i) => {
                            // Si c'est un string
                            if (typeof line === 'string') {
                                return (
                                    <p key={i}>
                                        {line}
                                        {isLoading && i === history.length - 1 && <span className="cursor">■</span>}
                                    </p>
                                )
                            }
                            // Si c'est un objet avec text et className
                            if (typeof line === 'object' && line !== null && 'text' in line) {
                                return (
                                    <p key={i} className={(line as any).className}>
                                        {(line as any).text}
                                        {isLoading && i === history.length - 1 && <span className="cursor">■</span>}
                                    </p>
                                )
                            }
                            // Si c'est un ReactNode (liens, etc)
                            return (
                                <p key={i}>
                                    {line}
                                </p>
                            )
                        })}
                    </div>
                    <form className='InputBox' onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <span className="input-text">
                                {!isLoading && '> '}
                                {input}
                                {!isLoading && <span className="cursor">■</span>}
                            </span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                autoFocus
                                disabled={isLoading}
                                className="hidden-input"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Terminal