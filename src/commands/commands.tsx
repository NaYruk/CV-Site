import '../components/Terminal.tsx'
import clear from './clear.tsx'
import help from './help.tsx'
import whoami from './whoami.tsx'
import education from './education.tsx'
import socials from './socials.tsx'
import projects from './projects.tsx'

function handleCommands(input: string, setHistory: React.Dispatch<React.SetStateAction<string[]>>, history: string[]): boolean
{
    switch (input.toUpperCase()) {
        case "CLEAR":
            clear(setHistory)
            return true // Ne pas ajouter à l'historique
        
        case "HELP":
            help(setHistory, history)
            return true
        
        case "WHOAMI":
            whoami(setHistory, history)
            return true
        
        case "EDUCATION":
            education(setHistory, history)
            return true
        
        case "PROJECTS":
            projects(setHistory, history)
            return true
        
        case "SOCIALS":
            socials(setHistory, history)
            return true
        default:
            console.log(`Unknown Command ! : ${input}`)
            return false // Ajouter à l'historique
    }
}

export default handleCommands

//const newHistory = [...history, `> ${input}`]
//setHistory(newHistory)