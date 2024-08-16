import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Component/Home/Home'
import Form from './Component/Form/Form'

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Form />} />
      <Route path="/" element={<Home />} />
     </Routes>
    </>
  )
}

export default App
