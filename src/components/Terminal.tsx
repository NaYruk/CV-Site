import './Terminal.css'
import '../commands/commands.css';
import '../commands/commands.tsx'
import { useState, useRef, useEffect } from 'react'
import handleCommands from '../commands/commands.tsx'
import printMessagesInTerminal from '../utils/loadingMessages.tsx'
import type { HistoryItem } from '../types/HistoryItem'

const availableCommands = [
    'help',
    'date',
    'echo',
    'education',
    'hack',
    'projects',
    'socials',
    'tree',
    'whoami',
    'clear',
    'exit',
]

interface TerminalProps {
    onExit?: () => void
    isUnzooming?: boolean
    hasBootedOnce?: boolean
    onBootComplete?: () => void
}

function Terminal({ onExit, isUnzooming = false, hasBootedOnce = false, onBootComplete }: TerminalProps) {
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<HistoryItem[]>(hasBootedOnce ? [
        '',
        '> System ready. Type "help" to view available commands.',
        '',
    ] : [])
    const [commandHistory, setCommandHistory] = useState<string[]>(() => {
        const saved = localStorage.getItem('commandHistory')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                if (Array.isArray(parsed)) {
                    return parsed
                }
            } catch (err) {
                console.log('Error loading command history:', err)
            }
        }
        return []
    }) // Historiques des commandes tapees
    const [historyIndex, setHistoryIndex] = useState<number>(-1) // Position dans l'historique
    const [isLoading, setIsLoading] = useState(!hasBootedOnce)

    const inputRef = useRef<HTMLInputElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)
    const outputRef = useRef<HTMLDivElement>(null)
    const firstPageLoadRef = useRef(false)

    // Remet le focus sur l'input après chaque changement
    useEffect(() => {
        inputRef.current?.focus()
        firstPageLoadRef.current = true
    }, [history])

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




    // Messages de chargement au démarrage (seulement la première fois)
    useEffect(() => {
        let timeoutId: number | null = null

        if (!hasBootedOnce) {
            // Premier boot - afficher les messages de chargement
            const loadingMessages = [
                '> INSERT COIN TO CONTINUE...',
                '> *CLINK* COIN DETECTED ✓',
                '',
                '> BOOTING ARCADE SYSTEM...',
                '> [████████████████████] 100%',
                '',
                '> LOADING ROM: DEVELOPER.BIN',
                '> LOADING ASSETS: SKILLS.DAT',
                '> LOADING LEVELS: PROJECTS.MAP',
                '',
                '> CHECKING HIGH SCORES...',
                '> PLAYER 1: RECRUITER',
                '',
                '╔═══════════════════════════════════════════════╗',
                '║        ★ MARC MILLIOT TERMINAL ★             ║',
                '║           DEVELOPER ARCADE v1.0               ║',
                '║                                               ║',
                '║         >>> PRESS START <<<                   ║',
                '╚═══════════════════════════════════════════════╝',
                '',
                '> READY PLAYER ONE!',
                '',
            ]

            const totalDelay = printMessagesInTerminal(setHistory, loadingMessages, 10, 10)

            timeoutId = setTimeout(() => {
                setIsLoading(false)
                setHistory(prev => [
                    ...prev,
                    '',
                    '> System ready. Type "help" to view available commands.',
                    '',
                ])
                // Marquer que le boot est terminé
                onBootComplete?.()
            }, totalDelay + 1000)
        }

        // Nettoyage du timeout si le composant est démonté
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [hasBootedOnce, onBootComplete])

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

    // Sauvegarder l'historique des commandes dans localStorage à chaque changement
    useEffect(() => {
        if (commandHistory.length > 0) {
            localStorage.setItem('commandHistory', JSON.stringify(commandHistory))
        }
    }, [commandHistory])

    // Auto-scroll vers le bas quand l'historique change
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight
        }
    }, [history])


    // Fonction wrapper pour setHistory
    const setHistoryWithLimit = (newHistory: HistoryItem[] | ((prev: HistoryItem[]) => HistoryItem[])) => {
        setHistory(newHistory)
    }


    // Verifie si une commande pourrait matcher au preremplissage
    const findMatchingCommands = (partial: string): string[] => {
        if (!partial.trim()) return []
    
        return availableCommands.filter(cmd => 
            cmd.toLowerCase().startsWith(partial.toLowerCase())
        )
    }

    // Permet de mettre en place l'historique de commande manipulable avec ArrowUp et ArrowDown
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault()
            // Retour à la borne d'arcade avec ESC
            setHistory(prev => [...prev, '', '> ESC pressed. Returning to arcade...'])
            setTimeout(() => {
                onExit?.()
            }, 1000)
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault() // Empeche le curseur de bouger

            // Remonter dans l'historique
            const newIndex = historyIndex + 1
            if (newIndex < commandHistory.length) {
                setHistoryIndex(newIndex)
                // Recuperer la commande depuis la fin du tableau
                setInput(commandHistory[commandHistory.length - 1 - newIndex])
            }
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault()

            // Descendre dans l'historique
            const newIndex = historyIndex - 1
            if (newIndex >= 0) {
                setHistoryIndex(newIndex)
                setInput(commandHistory[commandHistory.length - 1 - newIndex])
            } else {
                // Retour a la ligne vide
                setHistoryIndex(-1)
                setInput('')
            }
        }
        else if (e.key === 'Tab') {
            e.preventDefault()

            const matches = findMatchingCommands(input)
            if (matches.length === 1) {
                // Une seule correspondance → compléter automatiquement
                setInput(matches[0])
            }
            else if (matches.length > 1) {
                // Plusieurs correspondances → afficher les suggestions
                const suggestionText = `Available commands: ${matches.join(', ')}`
                setHistory(prev => [...prev, suggestionText])
            }
        }
    }


    // EVENT ENTER, new prompt line.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            // Gérer la commande exit
            if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
                setHistory(prev => [...prev, `> ${input}`, '> Returning to arcade...'])
                setTimeout(() => {
                    onExit?.()
                }, 1000)
                setInput('')
                return
            }

            // Ajouter la commande/input à l'historique
            setHistory(prev => [...prev, `> ${input}`])

            // Ajouter la commande a l'historique des commandes
            if (commandHistory[commandHistory.length - 1] !== input)
                setCommandHistory(prev => [...prev, input])
            // Reinitialiser l'index de l'historique a -1 (fin de l'historique (vide))
            setHistoryIndex(-1)

            // Puis exécuter la commande avec le wrapper
            handleCommands(input, setHistoryWithLimit)
            setInput('')
        }
    }

    return (
        <div className={`Monitor ${isUnzooming ? 'unzooming' : ''}`}>
            {/* Message d'avertissement pour très petits écrans */}
            <div className="terminal-size-warning">
                <p>📱</p>
                <p>Écran trop petit</p>
                <p>Veuillez tourner votre appareil en mode paysage ou utiliser un écran plus grand</p>
            </div>

            <div className="Screen">
                <div className="Terminal" ref={terminalRef}>
                    <div className="scanline"></div>
                    <div className="output" ref={outputRef}>
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
                                const lineObj = line as { text: string; className?: string }
                                return (
                                    <p key={i} className={lineObj.className}>
                                        {lineObj.text}
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
                                onKeyDown={handleKeyDown} // Fleches du haut et bas pour l'historique des commandes
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
