import '../components/Terminal.tsx'
import clear from './clear.tsx'
import help from './help.tsx'
import whoami from './whoami.tsx'
import education from './education.tsx'
import socials from './socials.tsx'
import projects from './projects.tsx'
import date from './date.tsx'
import echo from './echo.tsx'
import tree from './tree.tsx'
import hack from './hack.tsx'
import type { HistoryItem } from '../types/HistoryItem'

function handleCommands(input: string, setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>, history: HistoryItem[]): boolean
{
    switch (input.toUpperCase()) {
        case "CLEAR":
            clear(setHistory)
            return true // Ne pas ajouter à l'historique
        
        case "HELP":
            help(setHistory)
            return true
        
        case "WHOAMI":
            whoami(setHistory, history)
            return true
        
        case "EDUCATION":
            education(setHistory)
            return true
        
        case "PROJECTS":
            projects(setHistory)
            return true
        
        case "SOCIALS":
            socials(setHistory)
            return true

        case "DATE":
            date(setHistory)
            return true

        case "TREE":
            tree(setHistory)
            return true

        case "HACK":
            hack(setHistory)
            return true

        default:
            // Handle "echo" command (can have arguments)
            if (input.toUpperCase().startsWith("ECHO ")) {
                echo(input, setHistory)
                return true
            }
            console.log(`Unknown Command ! : ${input}`)
            return false // Ajouter à l'historique
    }
}

export default handleCommands
