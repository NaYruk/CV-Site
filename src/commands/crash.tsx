import type { HistoryItem } from '../types/HistoryItem'

function crash(setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>) {
    const crashScreen = [
        '',
        '╔══════════════════════════════════════════════════════════════════╗',
        '║                                                                  ║',
        '║        A PROBLEM HAS BEEN DETECTED AND WINDOWS HAS SHUT DOWN     ║',
        '║                                                                  ║',
        '║   If this is the first time you\'ve seen this stop error screen, ║',
        '║   restart your computer. If this screen appears again, follow    ║',
        '║   these steps:                                                   ║',
        '║                                                                  ║',
        '║   Check to make sure any new hardware or software is properly    ║',
        '║   installed. If this is a new installation, ask your hardware    ║',
        '║   or software manufacturer for any Windows updates you might     ║',
        '║   need.                                                          ║',
        '║                                                                  ║',
        '║   If problems continue, disable or remove newly installed        ║',
        '║   hardware or software. Disable BIOS memory options such as      ║',
        '║   caching or shadowing. If you need to use Safe Mode to remove   ║',
        '║   or disable components, restart your computer, press F8 to      ║',
        '║   select Advanced Startup Options, and then select Safe Mode.    ║',
        '║                                                                  ║',
        '║   TECHNICAL INFORMATION:                                         ║',
        '║   *** STOP: 0x00000000 (0x00000000, 0x00000000, 0x00000000)      ║',
        '║   ERROR CODE: CV_PORTFOLIO_FATAL                                 ║',
        '║   DRIVER_IRQL_NOT_LESS_OR_EQUAL                                  ║',
        '║                                                                  ║',
        '║   *** Begin Dump of Physical Memory ***                          ║',
        '║   Physical memory dump complete.                                 ║',
        '║                                                                  ║',
        '╚══════════════════════════════════════════════════════════════════╝',
        '',
        'Press any key to continue...',
    ]

    // Add animation with delays
    crashScreen.forEach((line, index) => {
        setTimeout(() => {
            setHistory(prev => [...prev, { text: line, className: 'crash-text' }])
        }, index * 80)
    })
}

export default crash
