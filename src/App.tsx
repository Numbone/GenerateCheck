import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Header from './entities/Header'
import { Route, Routes } from 'react-router-dom'
import CreateProduct from './entities/CreateProduct'
import Basket from './entities/Basket'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/create' element={<CreateProduct />}></Route>
        <Route path='/generation' element={<Basket />}></Route>
      </Routes>
    </>
  )
}

export default App
