import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ErrorPage,HomePage,RegisterPage } from "./pages";
const App = () =>{

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/error" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
