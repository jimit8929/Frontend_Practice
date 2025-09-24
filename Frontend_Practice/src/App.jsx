import {Routes , Route} from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import TodoList from "./Pages/TodoList"
import SignPage from "./Pages/SignPage"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/todo" element={<TodoList/>}/>
        <Route path="/signup" element={<SignPage/>}/>
      </Routes>
    
    </>
  )
}

export default App