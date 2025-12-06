import { useState } from 'react'
import './App.css'
import Terminal from './components/Terminal'
import ArcadeView from './components/ArcadeView'

type ViewState = 'arcade' | 'zooming' | 'terminal'

function App() {
  const [view, setView] = useState<ViewState>('arcade')
  const [hasBootedOnce, setHasBootedOnce] = useState(false)

  const handleArcadeClick = () => {
    // Démarrer l'animation de zoom
    setView('zooming')

    // Après 1.5s (durée de l'animation), afficher le terminal
    setTimeout(() => {
      setView('terminal')
    }, 1500)
  }

  const handleTerminalExit = () => {
    // Retour direct à l'arcade
    setView('arcade')
  }

  return (
    <>
      <div className="app">
        {view === 'arcade' && (
          <ArcadeView onStart={handleArcadeClick} isZooming={false} />
        )}

        {view === 'zooming' && (
          <ArcadeView onStart={() => {}} isZooming={true} />
        )}

        {view === 'terminal' && (
          <Terminal
            onExit={handleTerminalExit}
            isUnzooming={false}
            hasBootedOnce={hasBootedOnce}
            onBootComplete={() => setHasBootedOnce(true)}
          />
        )}
      </div>
    </>
  )
}

export default App
