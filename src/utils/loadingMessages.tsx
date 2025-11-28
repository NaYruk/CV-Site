import '../components/Terminal.tsx'
import type { HistoryItem } from '../types/HistoryItem'

// Helper function to extract text content from a React element
function getElementText(element: unknown): string {
    if (typeof element === 'string') return element
    if (!element || typeof element !== 'object' || !('props' in element)) return ''

    const elementWithProps = element as { props?: { children?: unknown } }
    const { children } = elementWithProps.props || {}
    if (typeof children === 'string') return children
    if (Array.isArray(children)) {
        return children
            .map((child: unknown) => getElementText(child))
            .join('')
    }
    return ''
}

function printMessagesInTerminal(
    setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>,
    messagesInArray: HistoryItem[],
    typingSpeed: number,
    pauseBetweenLines: number, // Pause entre les messages
    className?: string,
    initialDelay: number = 0
) {
    let totalDelay = initialDelay

    messagesInArray.forEach((message) => {
        // Handle empty strings
        if (message === '') {
            setTimeout(() => {
                setHistory(prev => [...prev, ''])
            }, totalDelay)
            totalDelay += 200
        }
        // Handle strings (with character-by-character animation)
        else if (typeof message === 'string') {
            // Créer une nouvelle ligne avec la classe CSS si fournie
            setTimeout(() => {
                if (className) {
                    setHistory(prev => [...prev, { text: '', className }])
                } else {
                    setHistory(prev => [...prev, ''])
                }
            }, totalDelay)

            // Ensuite, pour chaque lettre du message
            for (let i = 0; i <= message.length; i++) {
                setTimeout(() => {
                    const currentText = message.slice(0, i)
                    setHistory(prev => {
                        const newHistory = [...prev]
                        const lastItem = newHistory[newHistory.length - 1]

                        if (typeof lastItem === 'object' && lastItem !== null && 'text' in lastItem) {
                            const lastItemObj = lastItem as { text: string; className?: string }
                            lastItemObj.text = currentText
                        } else {
                            newHistory[newHistory.length - 1] = className
                                ? { text: currentText, className }
                                : currentText
                        }
                        return newHistory
                    })
                }, totalDelay + (i * typingSpeed))
            }

            totalDelay += (message.length * typingSpeed) + pauseBetweenLines
        }
        // Handle React elements (with character-by-character animation)
        else {
            // Extract text from the React element
            const elementText = getElementText(message)
            const textLength = elementText.length

            // Create initial empty line with className if provided
            setTimeout(() => {
                if (className) {
                    setHistory(prev => [...prev, { text: '', className }])
                } else {
                    setHistory(prev => [...prev, ''])
                }
            }, totalDelay)

            // Animate each character
            for (let i = 0; i <= textLength; i++) {
                setTimeout(() => {
                    const currentText = elementText.slice(0, i)
                    setHistory(prev => {
                        const newHistory = [...prev]
                        const lastItem = newHistory[newHistory.length - 1]

                        // If animation is complete, show the actual React element
                        if (i === textLength) {
                            newHistory[newHistory.length - 1] = message
                        } else {
                            // During animation, show text with className if available
                            if (className) {
                                if (typeof lastItem === 'object' && lastItem !== null && 'text' in lastItem) {
                                    const lastItemObj = lastItem as { text: string; className?: string }
                                    lastItemObj.text = currentText
                                } else {
                                    newHistory[newHistory.length - 1] = { text: currentText, className }
                                }
                            } else {
                                newHistory[newHistory.length - 1] = currentText
                            }
                        }
                        return newHistory
                    })
                }, totalDelay + (i * typingSpeed))
            }

            totalDelay += (textLength * typingSpeed) + pauseBetweenLines
        }
    })

    return totalDelay
}

export default printMessagesInTerminal