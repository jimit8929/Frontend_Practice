import {Routes , Route} from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import TodoList from "./Pages/TodoList"
import SignPage from "./Pages/SignPage"
import SearchFilter from "./Pages/SearchFilter"
import FetchingData from "./Pages/FetchingData"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/todo" element={<TodoList/>}/>
        <Route path="/signup" element={<SignPage/>}/>
        <Route path="/search" element={<SearchFilter/>}/>
        <Route path="/fetch" element={<FetchingData/>}/>
      </Routes>
    
    </>
  )
}

export default App