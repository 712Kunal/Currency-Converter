import { useState } from 'react'

import CurrencyConverter from './components/CurrecyConverter'

function App() {

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='container'>
        {/* component called */}
        <CurrencyConverter />
      </div>
    </div>
  )
}

export default App
