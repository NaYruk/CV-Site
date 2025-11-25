import './ArcadeView.css'

interface ArcadeViewProps {
    onStart: () => void
    isZooming?: boolean
}

function ArcadeView({ onStart, isZooming = false }: ArcadeViewProps) {
    return (
        <div className="arcade-room">
            <div
                className={`arcade-machine-container ${isZooming ? 'zooming' : ''}`}
                onClick={!isZooming ? onStart : undefined}
            >
                {/* Image de la borne en arrière-plan */}
                <img
                    src="/terminalArcade.png"
                    alt="Arcade Cabinet"
                    className="arcade-image"
                />

                {/* Écran interactif par-dessus l'image */}
                <div className="arcade-screen-overlay">
                    <div className="screen-content">
                        <p className="arcade-title">PORTFOLIO</p>
                        <p className="arcade-subtitle">TERMINAL</p>
                        <p className="blink-text">▼ CLICK TO START ▼</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArcadeView
