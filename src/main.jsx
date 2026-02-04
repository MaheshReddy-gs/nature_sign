import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function Root() {
  const [showGuides, setShowGuides] = useState(true)

  return (
    <StrictMode>
      {/* Toggle button */}
      <button
        onClick={() => setShowGuides(prev => !prev)}
        className="fixed top-4 right-4 z-[10000] rounded bg-black px-3 py-2 text-sm text-white shadow"
      >
        {showGuides ? 'Hide guides' : 'Show guides'}
      </button>

      {showGuides ? (
        <div className="relative m-0">
          {/* Left guide */}
          <div className="fixed top-0 left-6 h-screen w-px bg-red-500 pointer-events-none z-[9999]" />

          {/* Right guide */}
          <div className="fixed top-0 right-6 h-screen w-px bg-red-500 pointer-events-none z-[9999]" />

          <div className="fixed md:top-44 lg:top-[12.5rem] right-0 w-screen h-[2px] bg-green-500 pointer-events-none z-[9999]" />

          {/* Center max-width guide */}
          <div className="absolute h-screen w-screen hidden lg:flex justify-center items-center pointer-events-none z-[9999]">
            <div className="fixed max-w-6xl px-6 w-screen h-full pointer-events-none z-[9999]">
              <div className="w-full border-x-2 border-dashed h-full border-sky-500 text-lg">
                max-w-6xl px-6
              </div>
            </div>
          </div>

          <App />
        </div>
      ) : (
        <App />
      )}
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
