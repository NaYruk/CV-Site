import { useState } from 'react'
import './App.css'
import Terminal from './components/Terminal'

function App() {
  useState(0)
  return (
    <>
      <div className="app">
        <Terminal />
      </div>
    </>
  )
}

export default App
