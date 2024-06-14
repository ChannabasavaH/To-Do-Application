import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import ShowTodo from './pages/ShowTodo'
import SelectCategory from './pages/SelectCategory'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/api/todos/:id' element={ <ShowTodo />} />
        <Route path='/api/todos/select' element={ <SelectCategory /> } />
      </Routes>
    </>
  )
}

export default App
