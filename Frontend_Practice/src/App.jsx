import {Routes , Route} from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import TodoList from "./Pages/TodoList"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/todo" element={<TodoList/>}/>
      </Routes>
    
    </>
  )
}

export default App