import './commands.tsx'
import printMessagesInTerminal from '../utils/loadingMessages.tsx'
import type { HistoryItem } from '../types/HistoryItem'

function socials(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>) {

    const socialsPrompt: HistoryItem[] = [
        '',
        '',
        '',
        'mes réseaux de contacts :',
        '',
        <a key="https://github.com/NaYruk" href="https://github.com/NaYruk" target="_blank" className='socials-text'>👨‍💻 github</a>,
        <a key="https://github.com/NaYruk" href="https://www.linkedin.com/in/marc-milliot-a61651383" target="_blank" className='socials-text'>💼 linkedin</a>,
        <a key="https://github.com/NaYruk" href="https://www.instagram.com/marc.milliot/?next=%2F" target="_blank" className='socials-text'>🅾 instagram</a>,
        '',
        '',
        '',
    ]

    printMessagesInTerminal(setHistory, socialsPrompt, 20, 10, 'socials-text')
}

export default socials