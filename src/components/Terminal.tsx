import './Terminal.css'
import '../commands/commands.tsx'
import { useState, useRef, useEffect} from 'react'
import handleCommands from '../commands/commands.tsx'
import clear from '../commands/clear.tsx'


function Terminal() {
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<string[]>([])
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


    // Calcule dynamiquement le nombre max de lignes
    const [maxLines, setMaxLines] = useState(20)

    useEffect(() => {
        if (!terminalRef.current)
            return
        const calculateMaxLines = () => {
            const terminalHeight = terminalRef.current!.clientHeight
            console.log(terminalHeight)
            const padding = 70 // 35px top + 35px bottom
            const inputHeight = 50 // Hauteur approximative de l'input en px
            const availableHeight = terminalHeight - padding - inputHeight

            const lineHeight = 35 // Hauteur approximative de la ligne en px
            const calculateMax = Math.floor(availableHeight / lineHeight)

            setMaxLines(Math.max(2, calculateMax))
        }

        calculateMaxLines()

        //Recalcule si la fenetre change de taille
        window.addEventListener('resize', calculateMaxLines)
        return () => window.removeEventListener('resize', calculateMaxLines)
    }, [])


    // Messages de chargement au démarrage
    useEffect(() => {
        const loadingMessages = [
            'SECURITY RESET..........',
            '....................',
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
            'WELCOME TO THE BEAUTIFUL INTERACTIF CV TERMINAL'
        ]

        let totalDelay = 0
        const typingSpeed = 50  // 50ms entre chaque lettre
        const pauseBetweenLines = 300  // Pause entre les messages

        loadingMessages.forEach((message) => {
            if (message === '') {
                // Pour les lignes vides
                setTimeout(() => {
                    setHistory(prev => [...prev, ''])
                }, totalDelay)
                totalDelay += 200
            } else {
                setTimeout(() => {
                    setHistory(prev => [...prev, ''])
                }, totalDelay)

                // Ensuite, pour chaque lettre du message
                for (let i = 0; i <= message.length; i++) {
                    setTimeout(() => {
                        const currentText = message.slice(0, i)
                        setHistory(prev => {
                            const newHistory = [...prev]
                            newHistory[newHistory.length - 1] = currentText
                            return newHistory
                        })
                    }, totalDelay + (i * typingSpeed))
                }

                totalDelay += (message.length * typingSpeed) + pauseBetweenLines
            }
        })

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


    // EVENT ENTER, new prompt line.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            const isCommand = handleCommands(input, setHistory, history) // LANCE LE TRAITEMENT DES COMMANDES
            if (!isCommand) {
                const newHistory = [...history, `> ${input}`]
                // Garde seulement les dernières MAX_LINES lignes
                if (newHistory.length > maxLines) {
                    setHistory(newHistory.slice(-maxLines))
                } else {
                    setHistory(newHistory)
                }
            }
            setInput('')
        }
    }

    return (
        <div className="Monitor">
            <div className="Screen">
                <div className="Terminal" ref={terminalRef}>
                    <div className="scanline"></div>
                    <div className="output">
                        {history.map((line, i) => (
                            <p key={i}>
                                {line}
                                {isLoading && i === history.length - 1 && <span className="cursor">■</span>}
                            </p>
                        ))}
                    </div>
                    <form className='InputBox' onSubmit={handleSubmit}>
                        {!isLoading && <span>{'> '}</span>}
                        <div className="input-wrapper">
                            <span className="input-text">{input}</span>
                            {!isLoading && <span className="cursor">■</span>}
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