import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage></Homepage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
