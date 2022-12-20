import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { DonatePage, ErrorPage,EventPage,HomePage,RegisterPage, ResetPasswordPage, SignInPage } from "./pages";
const App = () =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<SignInPage/>}/>
        <Route path="/reset" element={<ResetPasswordPage/>}/>
        <Route path="/detail" element={<DonatePage/>}/>
        <Route path="/event" element={<EventPage/>}/>
        <Route path="/error" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
