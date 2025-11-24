import type { HistoryItem } from '../types/HistoryItem'

function matrix(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>) {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const lines = 15

    setHistory(prev => [...prev, ''])

    for (let line = 0; line < lines; line++) {
        setTimeout(() => {
            let matrixLine = ''
            for (let i = 0; i < 40; i++) {
                matrixLine += chars.charAt(Math.floor(Math.random() * chars.length))
            }
            setHistory(prev => [...prev, { text: matrixLine, className: 'matrix-text' }])
        }, line * 100)
    }
}

export default matrix
